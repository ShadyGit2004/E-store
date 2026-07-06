const Product = require("../models/productModel.js");

module.exports.getProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const category = req.query.category;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (req.query.cursorUpdatedAt && req.query.cursorId) {
      filter.$or = [
        {
          updatedAt: {
            $lt: new Date(req.query.cursorUpdatedAt),
          },
        },
        {
          updatedAt: new Date(req.query.cursorUpdatedAt),
          _id: {
            $lt: req.query.cursorId,
          },
        },
      ];
    }
    
    const products = await Product.find(filter)
      .sort({ updatedAt: -1, _id: -1 })
      .limit(limit);

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        cursorUpdatedAt: last.updatedAt,
        cursorId: last._id,
      };
    }
   
    res.json({
      count: products.length,
      products,
      nextCursor,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


module.exports.addProduct = async (req, res) => { 

  const {name, category, price} = req.body;

  if((!name || name.trim() == "") || !category || !price){
    return res.status(400).json({
      success : false,
      message : "Inavlid data!"
    })
  }

  try {
    const product = await Product.create({
        name, category, price, createdBy : req.user._id
      })

      res.status(201).json({
        success :true,
        product,
        message : "product created successfully"
      })
  } catch(e) {     
      res.status(500).json({
        success : false,
        message : e.message
    });
  }

};


module.exports.deleteProduct = async (req, res) => { 
  try {
  
    const {id : productId} = req.params;

    const product = await Product.findById(productId)  

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if(product.createdBy.toString() != req.user._id){
      return res.status(401).json({
        success : false,
        message : "unauthorized!"
      })
    }

    await Product.findByIdAndDelete(productId);

    res.status(201).json({
      success :true,
      message : "product deleted successfully"
    })

  } catch(e){
      res.status(500).json({
          success : false,
          message : e.message
      });
  }

}