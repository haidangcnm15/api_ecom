const check_PhoneNumber = (phone_number) => {
    var realPhoneNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phone_number.match(realPhoneNumber)) {
        return true;
    }
    return false;
};

const check_Email = (email) => {
    var realEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(realEmail)) {
        return true;
    }
    return false;
};
const check_Password = (password) => {
    var realPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
    if (password.match(realPassword)) {
        return true
    }
    return false;
};

const check_Timestamp = (timestamp) => {
    if (timestamp >= 0 && timestamp < Date.now())
        return true;

    return false;
};

const getName_ImageFront = (data) => {
    console.log('data', data)
    let type = data.mimetype.split("/");
    let date = new Date();
    return `avatarImage_${date.getTime()}.${type[1]}`
};

const checkRole = (role) => {
    if (role == 1 || role == 1024 || role == 2048)
        return true;
    return false
};

const checkStatus = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10)) && value > 0 && value < 8;
}

const check_Interger = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
};

module.exports = {
    checkRole, check_PhoneNumber, check_Email, getName_ImageFront,
    check_Timestamp, check_Password, checkStatus, check_Interger
}