const split_stringName = (data) => {
    let type = data.mimetype.split("/");
    let date = new Date();
    return `img-product${date.getTime()}.${type[1]}`
};

module.exports = { split_stringName }