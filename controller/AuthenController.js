
const { ErrorCode } = require('../constant');
const { UserServices } = require('../services');
const { Validation, signToken, verifyToken } = require('../utils');

async function _login(req, res, next) {
    const { username, password } = req.body;
    let user = await UserServices._getUserByUsername(username);
    if (user && user.isHidden == false && Validation.check_Password(password)) {
        // const hasMatch = await ComparePass(password, user.password);
        if (password === user.password) {
            const data = {
                _id: user._id,
                isAdmin: user.isAdmin,
                username: user.username,
                login_at: Date.now()
            }
            const response = await signToken(data);
            return ErrorCode.ErrorCode200(res, { access_token: response })
        } else {
            return ErrorCode.ErrorCodeResponse(res, 401, "Username or password not right", null)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 401, "Username does not exist", null);
    }
};

async function _loginAdmin(req, res, next) {
    const { username, password } = req.body;
    let user = await UserServices._getUserByUsername(username);
    console.log('user', user)
    if (user && !user.isHidden && user.isAdmin && Validation.check_Password(password)) {
        if (password === user.password) {
            const data = {
                _id: user._id,
                isAdmin: user.isAdmin,
                username: user.username,
                login_at: Date.now(),
                role: 2048
            }
            try {
                const response = await signToken(data);
                return ErrorCode.ErrorCode200(res, { access_token: response })
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }

        } else {
            return ErrorCode.ErrorCodeResponse(res, 401, "Username or password not right", null)
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 401, "Username does not exist", null);
    }
};

async function _register(req, res, next) {
    const { username, password } = req.body;
    if (username && Validation.check_Password(password)) {
        let user = await UserServices._getUserByUsername(username);
        if (!user) {
            try {
                const data = await UserServices._addUser(username, password);
                return ErrorCode.ErrorCode200(res, data)
            } catch (error) {
                return ErrorCode.ErrorCode500(res)
            }
        } else {
            return ErrorCode.ErrorCodeResponse(res, 400, "Username available! ")
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 404, "Username or Password is malformed", null)
    }

};

async function _checkAuthen(req, res, next) {
    const token = req.header("access_token");
    console.log('token', token)
    if (token) {
        try {
            const data = await verifyToken(token);
            if (!data) return ErrorCode.ErrorCodeResponse(res, 401, "Can not read Access-token", null);
            req.user = data;
            next();
        } catch (error) {
            return ErrorCode.ErrorCodeResponse(res, 403, "Token is not right")
        }
    } else {
        return ErrorCode.ErrorCodeResponse(res, 401, "Please check again token information in sended fields ", null)
    }
};

async function _checkPermissionAdmin(req, res, next) {
    const user = req.user;
    if (user.isAdmin !== true) return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to access!");
    next();
};

async function _checkPermissionUser(req, res, next) {
    const user = req.user;
    console.log('user', user)
    const userID = req.params["userID"];
    if (user._id !== userID) return ErrorCode.ErrorCodeResponse(res, 401, "Your account do not have permission to access!");
    next();
};

module.exports = {
    _login, _register, _checkAuthen, _loginAdmin,
    _checkPermissionAdmin, _checkPermissionUser
}
