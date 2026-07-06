const express =  require("express");
const router = express.Router();

const {isLoggedIn} = require("../middlewares/authMiddleware.js");
const {userRegister, userLogin, userProfile, userLogout} = require("../controllers/authController.js");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", isLoggedIn, userProfile);
router.get("/logout", userLogout);


module.exports = router;