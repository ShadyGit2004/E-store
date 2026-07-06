const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to authenticate!",
      });
    }
    req.user = user;
    next();
       
  

}

module.exports.isAdmin = async (req, res, next) => {

    if(req.user.role !== "admin"){
        return res.status(401).json({
            success : false,
            message : "you are unauthorized to create products"
        })
    }

    next();
}