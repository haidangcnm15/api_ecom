const { Validation } = require("../utils");
const { ProductServices } = require('../services');
const { ErrorCode } = require('../constant');

async function _getListProduct(req, res, next) {
    const type = req.query.type;
    try {
        const data = await ProductServices.getListProduct(type)
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getProductIsSale(req, res, next) {
    try {
        const data = await ProductServices._getProductIsSale()
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _addProduct(req, res, next) {
    const body = req.body;
    try {
        const data = await ProductServices.addProduct(body)
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _editProduct(req, res, next) {
    const body = req.body;
    const product_id = req.params['product_id'];
    const product = await ProductServices._getProductByID(product_id);
    if (product) {
        try {
            const data = await ProductServices._updateProduct(product_id, body)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _updateSaleForProduct(req, res, next) {
    const { sale } = req.body;
    const product_id = req.params['product_id'];
    const product = await ProductServices._getProductByID(product_id);
    if (product && sale >= 0 && sale <= 100) {
        try {
            const data = await ProductServices._updateSaleForProduct(product_id, sale)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _hiddenProduct(req, res, next) {
    const product_id = req.params["product_id"];
    const product = await ProductServices._getProductByID(product_id);
    if (product) {
        try {
            await ProductServices._hiddenProduct(product_id);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    }
    else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _showProduct(req, res, next) {
    const product_id = req.params["product_id"];
    const product = await ProductServices._getProductByID(product_id);
    if (product) {
        try {
            await ProductServices._showProduct(product_id);
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    }
    else {
        return ErrorCode.ErrorCode404(res)
    }
};

module.exports = {
    _getListProduct, _addProduct, _hiddenProduct, _editProduct, _showProduct,
    _updateSaleForProduct, _getProductIsSale
}
