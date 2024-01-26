const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({extended: true}))

let productData = {}
let orderData = {}

router.get("/", async function (req, res) {
    res.render("seller", {productData: productData, orderData: orderData});
});

router.get("/underwear", async function (req, res) {
    const data = await fetch("http://localhost:8080/underwear/" + req.query.underwearID).then((res) => res.json());
    productData = data
    res.redirect("/seller/");
});

router.get("/order-online", async function (req, res) {
    // let orderID
    // if (req.query.orderID)
    const data = await fetch("http://localhost:8080/order-online/" + req.query.orderID).then((res) => res.json());
    orderData = data
    res.redirect("/seller/");
});

router.get("/delete", async (req, res) => {
    console.log(req.originalUrl)
    await fetch("http://localhost:8080/underwear/" + req.query.underwearID, {method: "DELETE"});
})

router.post("/add", async (req, res) => {
    const x = [{
        underwear_id: req.body.underwearID,
        underwear_model_id: req.body.modelID,
        size: req.body.size,
        color: req.body.color,
        sku: req.body.sku,
        ean: req.body.ean,
        quantity: req.body.quantity,
        price: req.body.price
    }]

    const data = await fetch("http://localhost:8080/underwear/", {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(x)
    });

    console.log(data);
    res.redirect("/seller/underwear")

})


module.exports = router