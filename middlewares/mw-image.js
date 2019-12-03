const {cloudinary} = require("../utils/uploader");

exports.getOne = async(req, res, next) => {
    try {
        if(req.file) {
            let img = await cloudinary.v2.uploader.upload(req.file.path);
            let uploadImg = {
                url: img.secure_url,
                cloud_id: img.public_id
            };
            req.body.uploadImg = uploadImg;
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        if(req.files.images) {
            let uploadImgs = [];
            for(let file of req.files.images) {
                let img = await cloudinary.v2.uploader.upload(file.path);
                uploadImgs.push({
                    url: img.secure_url,
                    cloud_id: img.public_id
                });
            }
            req.body.uploadImgs = uploadImgs;
        }
        return next();
    } catch (e) {
        return next(e);
    }
}
