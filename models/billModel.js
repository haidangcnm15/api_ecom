const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const billSchema = new mongoose.Schema({
    order_id: {
        type: ObjectId,
        ref: "order",
        required: true
    },
    total: { type: Number, required: true },
    user_id: { type: ObjectId, ref: "user", required: true },
    isHidden: { type: Boolean, required: true, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null }
});
billSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllBills() {
        return this.find({}).populate("order_id").sort({ created_at: -1 }).exec();
    },
    findBillById(BillID) {
        return this.findById(BillID).exec();
    },
    findBillInfoById(BillID) {
        return this.findById(BillID).populate("order_id").populate("user_id").exec();
    },
    findBillByUserID(userID) {
        return this.find({ user_id: userID }).sort({ created_at: -1 }).sort({ created_at: -1 }).exec();
    },
    // deleteBill(bill_id) {
    //     return this.findOneAndDelete({ _id: bill_id }).exec();
    // }
};

module.exports = mongoose.model("bill", billSchema);
