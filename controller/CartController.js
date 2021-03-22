const { Validation } = require("../utils");
const { CartServices, UserServices } = require('../services');
const { ErrorCode } = require('../constant');

async function _getListCart(req, res, next) {
    try {
        const data = await CartServices._getListCart();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getListCartByUserID(req, res) {
    const user_id = req.params["user_id"];
    const user = await UserServices._getUserByID(user_id);
    if (user) {
        try {
            const data = await CartServices._getCartByUserID(user_id);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _getDetailCartByID(req, res) {
    const cart_id = req.params["cart_id"];
    const cart = await CartServices._getCartByID(cart_id);
    if (cart) {
        try {
            const data = await CartServices._getDetailCartByID(cart_id);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _addCart(req, res, next) {
    const body = req.body;
    const user = await CartServices._getUserByID(body.user_id);
    const product = await CartServices._getProductByID(body.product_id);
    if (user && product) {
        try {
            const data = await CartServices._addCart(body)
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _editCart(req, res, next) {
    const { qty } = req.body;
    const cart_id = req.params['cart_id'];
    const cart = CartServices._getCartByID(cart_id);
    if (cart) {
        try {
            const data = await cartServices._updateCart(cart_id, qty);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    }
    return ErrorCode.ErrorCode404(res)
};

async function _deleteCart(req, res, next) {
    const cart_id = req.params['cart_id'];
    const cart = await CartServices._getCartByID(cart_id);
    if (cart) {
        try {
            await CartServices._deleteCart(cart._id)
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

module.exports = {
    _getListCart, _deleteCart, _getListCartByUserID,
    _addCart, _editCart, _getDetailCartByID
};