const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    status: { type: String, required: true },
    history: [Object],
    order_detail: [{
        product: { type: String, required: true, ref: 'product' },
        qty: { type: Number, required: true, default: 1 }
    }],
    total: { type: Number, required: true },
    isHidden: { type: Boolean, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null }
});

orderSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllOrders() {
        return this.find({}).sort({ created_at: -1 }).exec();
    },
    findAllOrderByStatus(status) {
        return this.find({ status }).sort({ created_at: -1 }).exec();
    },
    findOrderById(orderID) {
        return this.findById(orderID).exec();
    },
    findInfoOrderfindAllOrderByStatusById(orderID) {
        return this.findById(orderID).populate({ path: "order_detail", populate: { path: "product" } }).sort({ created_at: -1 }).exec();
    },
    findOrderByUserID(userID) {
        return this.find({ user_id: userID }).populate({ path: "order_detail", populate: { path: "product" } }).sort({ created_at: -1 }).exec();
    },
    updateStatusOrder(_id, status, history) {
        return this.findOneAndUpdate({ _id }, { $set: { status, history, updated_at: Date.now() } }).exec()
    },

    // hiddenOrder(orderID) {
    //     return this.findOneAndUpdate({
    //         _id: orderID
    //     }, { $set: { isHidden: true } }).exec();
    // },
    // showOrder(orderID) {
    //     return this.findOneAndUpdate({
    //         _id: orderID
    //     }, { $set: { isHidden: false } }).exec();
    // },
}
module.exports = mongoose.model("order", orderSchema);
