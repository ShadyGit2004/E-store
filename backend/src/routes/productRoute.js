const { Router } = require("express");
const router = Router()
const {isLoggedIn, isAdmin} = require("../middlewares/authMiddleware.js");
const {getProducts, addProduct, deleteProduct} = require("../controllers/productController.js");
 
router.get("/", getProducts)
router.post("/create", isLoggedIn, isAdmin, addProduct)
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct)

module.exports = router;