let ProductModel = require('../models/productModel');
const mongoose = require('mongoose');

async function _queryDB(req) {
    return new Promise((resolve, reject) => {
        req
            .then(function (res) {
                resolve(res)
            })
            .catch(function (error) {
                reject(error);
            })
    })
};

const addProduct = (newProduct) => {
    let params = {
        name: newProduct.name,
        description: newProduct.description,
        amount: newProduct.amount,
        price: newProduct.price,
        image_id: newProduct.image_id,
        product_type: newProduct.product_type,
        material: newProduct.material,
        size: newProduct.size,
        color: newProduct.color,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = ProductModel.createNew(params)
    return _queryDB(req)
};

const getListProduct = (type) => {
    let req = type ? ProductModel.findProductByType(type)
        : ProductModel.findAllProducts()
    return _queryDB(req)
};

const _getProductByID = (product_id) => {
    if (mongoose.Types.ObjectId.isValid(order_id) && !Number.isInteger(order_id)) {
        let req = ProductModel.findProductById(product_id)
        return _queryDB(req)
    } else {
        return false
    }
};

// const _getProductByType = (type) => {
//     let req = ProductModel.findProductByType(type)
//     return _queryDB(req);
// };

const _getProductByName = (name) => {
    let req = ProductModel.findProductByName(name)
    return _queryDB(req);
};

const _getProductIsSale = () => {
    let req = ProductModel.findProductByisSale();
    return _queryDB(req)
};

const _updateProduct = (_id, product) => {
    let params = {
        name: product.name,
        description: product.description,
        amount: product.amount,
        price: product.price,
        image_id: product.image_id,
        product_type: product.product_type,
        material: product.material,
        size: product.size,
        color: product.color,
        updated_at: Date.now()
    }
    let req = ProductModel.updateProduct(params)
    return _queryDB(req)
};

const _updateSaleForProduct = (_id, sale) => {
    let req = ProductModel.updateSaleForProduct({ _id, sale });
    return _queryDB(req)
};

const _hiddenProduct = (product_id) => {
    let req = ProductModel.hiddenProduct(product_id)
    return _queryDB(req)
};

const _showProduct = (product_id) => {
    let req = ProductModel.showProduct(product_id)
    return _queryDB(req)
};
module.exports = {
    addProduct, getListProduct, _getProductByID, _hiddenProduct, _updateProduct,
    _getProductByName, _updateSaleForProduct, _getProductIsSale,
    _showProduct
};
