const express = require('express');
const adminRouter = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const { AuthenController, UserController, BillController,
    OrderController, ProductController, CartController, UploadController } = require('../controller');

//authen
adminRouter.post("/login-admin", AuthenController._loginAdmin)

//user
adminRouter.get("/user", AuthenController._checkAuthen, AuthenController._checkPermissionAdmin, UserController._getListUser);
// adminRouter.get("/user/:userID", AuthenController._checkAuthen, UserController._getUserByID);
adminRouter.patch("/user/changepass/:user_id", UserController._updatePassword);
adminRouter.put("/user/avatar/:user_id", UserController._updateAvatar);
adminRouter.delete("/hiddenuser/:user_id", UserController._hiddenUser);
adminRouter.put("/user/:user_id", UserController._updateInfoUser);
adminRouter.put("/showuser/:user_id", UserController._showUser);

//product
adminRouter.get("/product", ProductController._getListProduct);
adminRouter.get("/product/sale", ProductController._getProductIsSale);
adminRouter.post("/product", ProductController._addProduct);
adminRouter.put("/hiddenproduct/:product_id", ProductController._hiddenProduct);
adminRouter.put("/product/:product_id", ProductController._editProduct);
adminRouter.put("/product/sale/:product_id", ProductController._updateSaleForProduct);
adminRouter.put("/showproduct/:product_id", ProductController._showProduct);

// adminRouter.post("/product/search", ProductController._getProductByName);

//cart
adminRouter.get("/cart/user/:user_id", CartController._getListCartByUserID);
adminRouter.get("/cart", CartController._getListCart);
adminRouter.get("/cart/:cart_id", CartController._getDetailCartByID);
adminRouter.post("/cart", CartController._addCart);
adminRouter.delete("/cart/:cart_id", CartController._deleteCart);
adminRouter.put("/cart/:cart_id", CartController._editCart);

//uploads
adminRouter.post("/uploads-photos", UploadController._uploadMutilPhoto);
adminRouter.post("/uploads-avatar", upload.single('avatar'), UploadController._uploadImage);

//order
adminRouter.get("/order", OrderController._getListOrder);
adminRouter.post("/order", OrderController._addOrder);
adminRouter.put("/order/:order_id", OrderController._updateStatus);
adminRouter.get("/order/:user_id", OrderController._getListOrderByUserID);
adminRouter.get("/order/info/:order_id", OrderController._getInfoOrderByID);

//bill
adminRouter.get("/bill", BillController._getListBill);
adminRouter.get("/bill/:billID", BillController._getBillInfoByID);
adminRouter.get("/bill/user/:userID", BillController._getBillByUSerID);
adminRouter.post("/bill", BillController._addBill);

module.exports = { adminRouter }