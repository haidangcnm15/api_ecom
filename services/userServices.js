let UserModel = require('../models/userModel');
const mongoose = require('mongoose');

async function _queryDB(req) {
    return new Promise((resolve, reject) => {
        req
            .then(function (res) {
                resolve(res)
            })
            .catch(function (error) {
                reject(error);
            })
    })
};

const _getListUser = () => {
    let req = UserModel.findAllUsers()
    return _queryDB(req)
};

const _getUserByID = (user_id) => {
    if (mongoose.Types.ObjectId.isValid(user_id) && !Number.isInteger(user_id)) {
        let req = UserModel.findUserById(user_id)
        return _queryDB(req)
    } else {
        return false
    }
};

const _getUserByPhoneNumber = async (phone_number) => {
    let req = UserModel.findUserByPhoneNumber(phone_number)
    return _queryDB(req);
};

const _getUserByUsername = (username) => {
    let req = UserModel.findUserByUsername(username)
    return _queryDB(req);
};

const _addUser = (username, password) => {
    const params = {
        username, password,
        created_at: Date.now(),
        updated_at: Date.now()
    }
    let req = UserModel.createNew(params)
    return _queryDB(req)
};

const _updateUser = (_id, user) => {
    const params = {
        full_name: user.full_name,
        phone_number: user.phone_number,
        dob: user.dob,
        gender: user.gender,
        address: user.address,
        email: user.email,
        updated_at: Date.now()
    }
    let req = UserModel.updateUser(_id, params)
    return _queryDB(req)
};

const _updateAvatar = (_id, ava) => {
    let req = UserModel.updateAvatar(_id, ava);
    return _queryDB(req)
};

const _updatePassword = (_id, password) => {
    let req = UserModel.updatePassword(_id, password);
    return _queryDB(req)
};

const _hiddenUser = (user_id) => {
    let req = UserModel.hiddenUser(user_id)
    return _queryDB(req)
};

const _showUser = (user_id) => {
    let req = UserModel.showUser(user_id);
    return _queryDB(req)
};

module.exports = {
    _addUser, _getListUser, _getUserByUsername,
    _getUserByID, _getUserByPhoneNumber, _hiddenUser,
    _updateUser, _updateAvatar, _updatePassword, _showUser
};
