const { Validation } = require("../utils");
const { BillServices, UserServices, OrderServices } = require('../services');
const { ErrorCode } = require('../constant');

async function _getListBill(req, res, next) {
    try {
        const data = await BillServices._getListBill();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(Res)
    }
};

async function _getBillByUSerID(req, res, next) {
    const user_id = req.params['userID'];
    const user = await UserServices._getUserByID(user_id);
    if (user) {
        try {
            const data = await BillServices._getBillByUserID(user_id);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(Res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _getBillInfoByID(req, res, next) {
    const bill_id = req.params['billID'];
    const bill = await BillServices._getBillByID(bill_id);
    if (bill) {
        try {
            const data = await BillServices._getBillInfoByID(bill_id);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(Res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _addBill(req, res, next) {
    const body = req.body
    const user = await UserServices._getUserByID(body.user_id);
    const order = await OrderServices._getOrderByID(body.order_id);
    if (user && !user.isHidden && order && order.status == 3 && order.total == body.total) {
        try {
            const data = await BillServices._addBill(params);
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};


module.exports = { _getListBill, _addBill, _getBillInfoByID, _getBillByUSerID, };