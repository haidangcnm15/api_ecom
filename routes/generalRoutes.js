const express = require('express');
const generalRouter = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const { AuthenController, UserController, BillController,
    OrderController, ProductController, CartController, UploadController } = require('../controller');


//authen
generalRouter.post("/register", AuthenController._register);
generalRouter.post("/login", AuthenController._login);

//user 
generalRouter.get("/user/:user_id", AuthenController._checkAuthen, UserController._getUserByID);

//product

// cart 

//uploads

//order

//bill


module.exports = { generalRouter }