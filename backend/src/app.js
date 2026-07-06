const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoute.js")

const app = express();

app.use(cors({origin : process.env.CORS_ORIGIN, credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("home")
})

app.use("/auth", authRoutes)
app.use("/products", productRoutes)


module.exports = app;