const { Validation } = require("../utils");
const { UserServices, OrderServices, ProductServices } = require('../services');
const { ErrorCode } = require('../constant');

async function _getListOrder(req, res, next) {
    try {
        const data = await orderServices._getListOrder();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getListOrderByUserID(req, res, next) {
    const user_id = req.params["user_id"];
    const user = await UserServices._getUserByID(user_id);
    if (user) {
        try {
            const data = await orderServices._getOrderByUserID(user_id);
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.error500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }

};

async function _getInfoOrderByID(req, res, next) {
    const order_id = req.params["order_id"];
    const order = await orderServices._getOrderByID(order_id);
    if (order) {
        try {
            const data = await orderServices._getOrderInfoByID(order_id);
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }

};

async function _addOrder(req, res, next) {
    const body = req.body;
    const user = userServices._getUserByID(body.user_id);
    if (user) {
        try {
            const data = await orderServices._addOrder(body)
            return ErrorCode.ErrorCode200(res, data)
        }
        catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    }
    else {
        return ErrorCode.ErrorCode404(res)
    }
}

// async function _deleteOrder(req, res, next) {
//     const order_id = req.params['order_id'];
//     const order = await orderServices._getOrderByID(order_id);
//     if (order) {
//         try {
//             await orderServices._deleteOrder(order._id)
//             return res.status(200).json({
//                 error: error200
//             })

//         } catch (error) {
//             return res.status(500).json({
//                 error: error500
//             })
//             next(error);
//         }
//     }
//     else {
//         return res.status(404).json({
//             error: error404
//         })
//     }
// };

async function _updateStatus(req, res, next) {
    const { status } = req.body;
    const order_id = req.params['order_id'];
    const order = await orderServices._getOrderByID(order_id);
    if (order && order.status < 4 && Validation.checkStatus(status) &&
        status - order.status == 1) {
        try {
            const data = await orderServices._updateStatus(order_id, status, order.history)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    }
    else {
        return ErrorCode.ErrorCode404(res)
    }
};

module.exports = {
    _getListOrder, _getListOrderByUserID, _updateStatus,
    _addOrder, _getInfoOrderByID
};