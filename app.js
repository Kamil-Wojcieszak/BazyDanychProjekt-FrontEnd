const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs')

const sellerAPI = require("./routes/seller.js")
const clientAPI = require("./routes/client.js")

data = ""

// app.use('/underwear', backendAPI);
app.use('/seller', sellerAPI);
app.use('/client', clientAPI);

app.listen(3000, function () {
    console.log("Server is running on port 3000")
})

app.get("/", function (req, res) {
   res.send(" <h1>Hello</h1>")
})

