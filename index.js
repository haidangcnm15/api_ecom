const express = require('express');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { generalRouter, adminRouter } = require('./routes');
const connectDB = require('./constant/connectDB');

const app = express();
const port = 8888;

connectDB();
// enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
);
//app.use(express.static(__dirname + '/uploads'));

app.use("/uploads", express.static(__dirname + '/uploads'));

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("It's working!"));

//admin
app.use('/', adminRouter);
app.use('/', generalRouter);

//listen port 
app.listen(port, function () {
    console.log("Your app running on port " + port);
})