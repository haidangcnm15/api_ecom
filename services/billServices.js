let BillModel = require('../models/billModel');
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
}

const _getListBill = () => {
    let req = BillModel.findAllBills()
    return _queryDB(req)
};

const _addBill = (newBill) => {
    let params = {
        order_id: newBill.order_id,
        total: newBill.total,
        user_id: newBill.user_id,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = BillModel.createNew(params)
    return _queryDB(req)
};

const _getBillByID = (Bill_id) => {
    if (mongoose.Types.ObjectId.isValid(Bill_id) && !Number.isInteger(Bill_id)) {
        let req = BillModel.findBillById(Bill_id)
        return _queryDB(req)
    } else {
        return false
    }
};

const _getBillInfoByID = (bill_id) => {
    let req = BillModel.findBillInfoById(bill_id)
    return _queryDB(req)
};

// const _deleteBill = (bill_id) => {
//     let req = BillModel.deleteBill(bill_id);
//     return _queryDB(req);
// }
const _getBillByUserID = (user_id) => {
    let req = BillModel.findBillByUserID(user_id)
    return _queryDB(req);
};




module.exports = {
    _addBill, _getListBill, _getBillByID,
    _getBillByUserID, _getBillInfoByID
};