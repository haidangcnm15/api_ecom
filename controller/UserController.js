const { Validation } = require("../utils");
const { UserServices } = require('../services');
const { ErrorCode } = require('../constant');

async function _getListUser(req, res, next) {
    try {
        const data = await UserServices._getListUser();
        return ErrorCode.ErrorCode200(res, data)
    } catch (error) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _getUserByID(req, res, next) {
    const params = req.params['user_id']
    const data = await UserServices._getUserByID(params);
    if (data) {
        try {
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _updateInfoUser(req, res, next) {
    const body = req.body;
    const params = req.params['user_id'];
    if (Validation.check_PhoneNumber(body.phone_number) && Validation.check_Interger(body.gender)
        && body.gender > 0 && body.gender < 3 && Validation.check_Timestamp(body.dob) && (body.email ? Validation.check_Email(body.email) : true)) {
        const user = await UserServices._getUserByID(params);
        if (user) {
            try {
                const data = await UserServices._updateUser(params, body)
                return ErrorCode.ErrorCode200(res, data)
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }
        } else {
            return ErrorCode.ErrorCode404(res)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 402, "Please check your information not right", null)
    }
};

async function _updateAvatar(req, res, next) {
    const { avatar } = req.body;
    const params = req.params['user_id'];
    const user = await UserServices._getUserByID(params);
    if (user) {
        try {
            const data = await UserServices._updateAvatar(params, avatar)
            return ErrorCode.ErrorCode200(res, data)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _updatePassword(req, res, next) {
    const { newPassword, oldPassword } = req.body;
    const params = req.params['user_id'];
    const user = await UserServices._getUserByID(params);
    console.log('old', params)
    if (user && Validation.check_Password(oldPassword) && Validation.check_Password(newPassword)) {
        if (user.password == oldPassword) {
            try {
                const data = await UserServices._updatePassword(params, newPassword)
                return ErrorCode.ErrorCode200(res, data)
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 404, "Please check again you password", null)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _hiddenUser(req, res, next) {
    const params = req.params['user_id'];
    const user = await UserServices._getUserByID(params)
    if (user) {
        try {
            await UserServices._hiddenUser(params)
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};

async function _showUser(req, res, next) {
    const params = req.params['user_id'];
    const user = await UserServices._getUserByID(params)
    if (user) {
        try {
            await UserServices._showUser(params)
            return ErrorCode.ErrorCode200(res, null)
        } catch (error) {
            return ErrorCode.ErrorCode500(res)
        }
    } else {
        return ErrorCode.ErrorCode404(res)
    }
};


module.exports = {
    _getListUser, _getUserByID, _updateInfoUser, _updateAvatar,
    _updatePassword, _hiddenUser, _showUser
}