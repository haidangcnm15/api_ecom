const { ErrorCode } = require('../constant');
const { BASE_API_URL } = require('../constant');
const { split_stringName } = require('../utils/split_image');

async function _uploadMutilPhoto(req, res, next) {
    const body = req.body
    try {
        if (!req.files) {
            return ErrorCode.ErrorCode404(res, 404, "No file is uploaded!", null)
        } else {
            let data = [];
            let name_img = "";
            const photos = [];
            var result = Object.keys(req.files).map((key) => photos.push(req.files[key]));
            if (Array.isArray(photos)) {
                photos.forEach((photo, i) => {
                    //move photo to uploads directory
                    name_img = split_stringName(photo)
                    photo.mv("./uploads/product/" + name_img);
                    //push file details
                    data.push({
                        name: name_img,
                        mimetype: photo.mimetype,
                        size: photo.size,
                        url: `${BASE_API_URL}/uploads/product/${name_img}`
                    });
                });
            }
            else {
                name_img = split_stringName(photos)
                photos.mv("./uploads/product/" + name_img);
                data = {
                    name: name_img,
                    mimetype: photos.mimetype,
                    size: photos.size,
                    url: `${BASE_API_URL}/uploads/product/${name_img}`
                }
            }
            return ErrorCode.ErrorCode200(res, data)
        }
    } catch (err) {
        return ErrorCode.ErrorCode500(res)
    }
};

async function _uploadImage(req, res, next) {
    if (!req.files) {
        return ErrorCode.ErrorCodeResponse(res, 400, "No file is uploaded", null)
    } else {
        try {
            const photos = req.files.files;
            let name_img = create_info.getName_Image(type, photos);
            photos.mv("./uploads/avatar" + name_img);
            let data = {
                name: name_img,
                mimetype: photos.mimetype,
                size: photos.size,
                url: `${BASE_API_URL}/uploads/${name_img}`
            }
            return ErrorCode.ErrorCode200(res, data)
        } catch (err) {
            return ErrorCode.ErrorCode500
        }
    }
}


module.exports = { _uploadMutilPhoto, _uploadImage };