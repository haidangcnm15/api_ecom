let OrderDetailModel = require('../models/orderDetailModel');

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
}

const _getListOrderDetail = () => {
    let req = OrderDetailModel.findAllOrderDetails()
    return _queryDB(req)
};
const _getOrderDetailByID = (orderdetail_id) => {
    let req = OrderDetailModel.findOrderDetailById(orderdetail_id)
    return _queryDB(req)
};
const _addOrderDetail = (newOrderDetail) => {
    let req = OrderDetailModel.createNew(newOrderDetail)
    return _queryDB(req)
};


// const _getOrderDetailByUserID = (user_id) => {
//     let req = OrderDetailModel.findOrderByUserID(user_id)
//     return _queryDB(req);
// };

const _deleteOrderDetail = (order_id) => {
    let req = OrderDetailModel.deleteOrder(order_id)
    return _queryDB(req)
};

// const _updateOrderDetail = (order) => {
//     let req = OrderDetailModel.updateOrder(order)
//     return _queryDB(req)
// };


module.exports = { _getOrderDetailByID, _getListOrderDetail, _addOrderDetail, _deleteOrderDetail };
