const express = require("express");
const app= express();
const bp = require("body-parser");

var QRCode = require('qrcode')

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());




  app.get("/", (req, res) => {
    res.render("index");
});
app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    QRCode.toDataURL(url, (err, src) => {
        if (err)
        {
            res.send("Error occured");
        }

        res.render("qr", { src });
    });
});

app.listen(process.env.PORT||5000,()=>{console.log("server started")});