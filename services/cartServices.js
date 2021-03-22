let CartModel = require('../models/cartModel');
const mongoose = require('mongoose');

async function _queryDB(req) {
    return new Promise((resolve, reject) => {
        req
            .then(function (res) {
                console.log('res', res)
                resolve(res)
            })
            .catch(function (error) {
                reject(error);
            })
    })
};

const _getListCart = () => {
    let req = CartModel.findAllCarts()
    return _queryDB(req)
};

const _addCart = (newCart) => {
    const params = {
        user_id: newCart.user_id,
        product_id: newCart.product_id,
        qty: newCart.qty,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = CartModel.createNew(params)
    return _queryDB(req)
};

const _getCartByID = (Cart_id) => {
    if (mongoose.Types.ObjectId.isValid(Cart_id) && !Number.isInteger(Cart_id)) {
        let req = CartModel.findCartById(Cart_id)
        return _queryDB(req)
    } else {
        return false;
    }
};
const _getDetailCartByID = (_id) => {
    let req = CartModel.findDetailCartByID(_id);
    return _queryDB(req)
};

const _getCartByUserID = (user_id) => {
    let req = CartModel.findCartByUserID(user_id)
    return _queryDB(req);
};

const _updateCart = (_id, qty) => {
    if (qty == 0) {
        let req = CartModel.deleteCart(_id)
        return _queryDB(req)
    } else {
        let req = CartModel.updateCart(_id, qty)
        return _queryDB(req)
    }
};

const _deleteCart = (Cart_id) => {
    let req = CartModel.deleteCart(Cart_id)
    return _queryDB(req)
};

module.exports = {
    _getDetailCartByID, _addCart, _getListCart,
    _getCartByID, _deleteCart, _updateCart, _getCartByUserID
};