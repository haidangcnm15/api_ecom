const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const order_detailSchema = new mongoose.Schema({
    product_id: {
        type: ObjectId,
        ref: "product",
        required: true
    },
    qty: { type: Number, require: true },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null }
});
order_detailSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllOrderDetails() {
        return this.find({}).populate("product_id").exec();
    },
    findOrderDetailById(orderDetailID) {
        return this.findById(orderDetailID).populate("product_id").exec();
    },
    findOrderDetailByOrderID(order_ID) {
        return this.find({ user_id: order_ID }).populate("product_id").exec();
    },
    updateOrder(order) {
        return this.updateOne({ _id: order._id }, { $set: order });
    },
    deleteOrder(orderID) {
        return this.deleteOne({
            _id: orderID
        }).exec();
    },
}
module.exports = mongoose.model("orderdetail", order_detailSchema);
