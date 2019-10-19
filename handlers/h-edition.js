const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        let editions = await db.Edition.find().populate("book_id").populate("provider_id").populate("bookimage_id").exec();
        return res.status(200).json(editions);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        console.log(req.body.uploadImgs);
        return res.status(200).json("ok done");
    } catch(err) {
        return next(err);
    }
}
