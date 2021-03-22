const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: { type: String, default: "" },
    password: { type: String, required: true },
    username: { type: String, required: true },
    phone_number: { type: String, default: "" },
    dob: { type: Number, default: 0 },
    gender: { type: Number, default: 0 },
    address: { type: String, default: "" },
    type_login: { type: String, default: "ad" },
    favor_id: [{ type: String, default: "" }],
    avatar: { type: String, required: true, default: "" },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, default: "" },
    isHidden: { type: Boolean, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null }
});
userSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllUsers() {
        return this.find({ isAdmin: false }).exec();
    },
    findUserById(userID) {
        return this.findById(userID).exec();
    },
    findUserByPhoneNumber(phone) {
        return this.findOne({ phone_number: phone }).exec();
    },
    findUserByUsername(username) {
        return this.findOne({ username: username }).exec();
    },
    updateUser(_id, user) {
        return this.findOneAndUpdate({ _id }, { $set: user }, { new: true });
    },
    updateAvatar(_id, ava) {
        return this.findOneAndUpdate({ _id }, { $set: { avatar: ava, updated_at: Date.now() } }, { new: true }).exec();
    },

    updatePassword(_id, password) {
        return this.findOneAndUpdate({ _id }, { $set: { password: password, updated_at: Date.now() } }, { new: true }).exec();
    },

    hiddenUser(_id) {
        return this.findOneAndUpdate({ _id }, { $set: { isHidden: true, updated_at: Date.now() } }).exec();
    },
    showUser(_id) {
        return this.findOneAndUpdate({ _id }, { isHidden: false, updated_at: Date.now() }).exec();
    }
}
module.exports = mongoose.model("user", userSchema);
