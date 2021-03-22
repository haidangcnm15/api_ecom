const bcrypt = require("bcrypt");
const Promise = require("bluebird");

const saltRound = 5;

const hashCode = (param) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(param, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  });
};

const deCode = (param, src) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(`alo`, `alo`)
      .then((res) => console.log(res))
      .catch((e) => reject(e));
  });
};
module.exports = { deCode, hashCode };
