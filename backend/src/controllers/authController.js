const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.userRegister = async (req, res)=>{
    const {username, password} = req.body;
 
    if((!username || typeof username !== 'string') || !password){
        return res.status(400).json({
            success : false,
            message : "invalid input!"
        })
    }

    const userExist = await userModel.findOne({username});

    if(userExist){
        return res.status(409).json({
            success : false,
            message : "user already exist!"
        })
    }

    const user = await userModel.create({
        username,
        password : await bcrypt.hash(password, 10) 
    });

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        success : true,
        message : "user registerd successfully!"
    })
};

module.exports.userLogin = async (req, res)=>{

    const {username, password} = req.body;    
 
    if((!username || typeof username !== 'string') || !password){
        return res.status(401).json({
            success : false,
            message : "missing username or password!"
        })
    }   
    
    const user = await userModel.findOne({username});

    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found!"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
        return res.status(401).json({
            success : false,
            message : "invalid username or password!"
        })
    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({
        success : true,
        user,
        message : "User Logged in sucessfully!"
    })
};

module.exports.userProfile = async (req, res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success : false,
            message : "missing token!"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id).select("-password");

        res.status(200).json({
            success : true,
            user,
        })
    } catch(e){
        return res.status(401).json({
            success : false,
            message : e
        })
    }


    // res.status(200).json({
    //         success : true,
    //         user,
    //     })
};

module.exports.userLogout = async (req, res)=>{
    if(!req.cookies.token){
        return res.status(401).json({
            success : false,
            message : "Already Logged out!"
        })
    }
    res.clearCookie("token")
    res.status(200).json({
        success : true,        
        message : "User Logged out sucessfully!"
    })
};