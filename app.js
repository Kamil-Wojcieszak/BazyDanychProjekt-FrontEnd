const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));


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
   res.send("<a href='/seller'><h1>Seller</h1></a><a href='/client'><h1>Client</h1></a>"
   )
})

