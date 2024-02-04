const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({extended: true}))

let productsData = []
let productsInCart = []
router.get("/", async function (req, res) {
    productsData = []
    productsData = await fetch("http://localhost:8080/underwear/").then((res) => res.json());
    res.render("client", {productsData: productsData, productsInCart: productsData});
});

router.get("/cart", async function (req, res) {
    res.render("cart", {productsInCart: productsInCart})
})

router.post("/addToCart", async function (req, res) {
    let underwear_id = req.body.underwear_id
    console.log(underwear_id)

    for (let i = 0; i < productsData.length; i++) {
        if (productsData[i].underwear_id === Number(underwear_id)) {
            productsInCart.push(productsData[i])
            break;
        }
    }

    console.log(productsInCart)
    res.redirect("/client/")
})
router.post("/removeFromCart", async function (req, res) {
    let underwear_id = req.body.underwear_id
    console.log(underwear_id)

    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].underwear_id === Number(underwear_id)) {
            productsInCart.splice(i,1)
            break;
        }
    }

    res.redirect("/client/cart/")
})

router.post("/submitOrder", async function (req, res) {
    const date = new Date()
    const x = [{
        totality: req.body.totality,
        email: req.body.email,
        date: date.toISOString(),
        phone_number: req.body.phone_number,
        status: 'NEW'
    }]

    const data = await fetch("http://localhost:8080/order-online/add", {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(x)
    });

    productsInCart = []

    res.redirect("/client")
})


module.exports = router