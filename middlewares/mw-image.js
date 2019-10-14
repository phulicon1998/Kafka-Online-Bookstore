const {cloudinary} = require("../utils/uploader");

exports.getOne = async(req, res, next) => {
    try {
        if(req.file) {
            let img = await cloudinary.v2.uploader.upload(req.file.path);
            let uploadImg = {
                url: img.secure_url,
                cloud_id: img.public_id
            }
            req.body.uploadImg = uploadImg;
        }
        return next();
    } catch(err) {
        return next(err);
    }
}
