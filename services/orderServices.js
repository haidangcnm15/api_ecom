let OrderModel = require('../models/orderModel');
const mongoose = require('mongoose');
const { Validation } = require('../utils');

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

const _getListOrder = (status) => {
    let req = Validation.checkStatus(status) ? OrderModel.findAllOrderByStatus(status)
        : OrderModel.findAllOrders()
    return _queryDB(req)
};

const _addOrder = (newOrder) => {
    let params = {
        user_id: newOrder.user_id,
        status: 1,
        history: [
            {
                status: 1,
                created_at: Date.now()
            }
        ],
        order_detail: newOrder.order_detail,
        total: newOrder.total,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = OrderModel.createNew(params)
    return _queryDB(req)
};

const _getOrderByID = (order_id) => {
    if (mongoose.Types.ObjectId.isValid(order_id) && !Number.isInteger(order_id)) {
        let req = OrderModel.findOrderById(order_id)
        return _queryDB(req)
    } else {
        return false
    }
};
const _getOrderInfoByID = (order_id) => {
    console.log('order', order_id)
    let req = OrderModel.findInfoOrderById(order_id)
    return _queryDB(req)
}
const _getOrderByUserID = (user_id) => {
    let req = OrderModel.findOrderByUserID(user_id)
    return _queryDB(req);
};

// const _hiddenOrder = (order_id) => {
//     let req = OrderModel.hiddenOrder(order_id)
//     return _queryDB(req)
// };

const _updateStatus = (order_id, status, history) => {
    history[status - 1] = {
        status, created_at: Date.now()
    }
    let req = OrderModel.updateStatusOrder(order_id, status, history);
    return _queryDB(req)
};

// const _showOrder = (order_id) => {
//     let req = OrderModel.showOrder(order_id);
//     return _queryDB(req);
// };

module.exports = {
    _addOrder, _getListOrder, _getOrderByID, _updateStatus,
    _getOrderInfoByID, _getOrderByUserID
};