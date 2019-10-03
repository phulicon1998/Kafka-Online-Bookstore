const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        let createdGenre = await db.Genre.create(req.body);
        return res.status(200).json(createdGenre);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let genre = await db.Genre.find();
        return res.status(200).json(genre);
    } catch(err) {
        return next(err);
    }
}
