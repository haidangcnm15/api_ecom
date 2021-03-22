const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  product_id: {
    type: ObjectId,
    ref: "product",
    required: true
  },
  qty: { type: Number, default: 1 },
  isHidden: { type: Boolean, default: false },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: null }
});

cartSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findAllCarts() {
    return this.find({}).populate("user_id").sort({ created_at: -1 }).exec();
  },
  findCartById(CartID) {
    return this.findById(CartID).exec();
  },
  findDetailCartByID(_id) {
    return this.findById(_id).populate("user_id").populate("product_id").exec()
  },
  findCartByUserID(userID) {
    return this.find({ user_id: userID }).populate("product_id").sort({ created_at: -1 }).exec();
  },
  updateCart(_id, cart) {
    return this.findOneAndUpdate({ _id }, { $set: { qty: qty, updated_at: Date.now() } });
  },
  deleteCart(CartID) {
    return this.findOneAndDelete({
      _id: CartID
    }).exec();
  },
  // showCart(CartID) {
  //   return this.findOneAndUpdate({
  //     _id: CartID
  //   }, { isHidden: false }).exec();
  // }
};
module.exports = mongoose.model("cart", cartSchema);
