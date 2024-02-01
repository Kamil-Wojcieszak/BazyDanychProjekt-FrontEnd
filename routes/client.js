const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({extended: true}))

let productData
let productsInCart
router.get("/", async function (req, res) {
    productData = await fetch("http://localhost:8080/underwear/").then((res) => res.json());
    res.render("client", {productData: productData, productsInCart: productData});
});

router.get("/cart", async function (req, res) {
    res.render("cart", {productData: productData, productsInCart: productData})
})

router.post("/addToCart", async function (req, res) {
    productsInCart += await fetch("http://localhost:8080/underwear/").then((res) => res.json());
    res.redirect("/client/")
})


module.exports = router