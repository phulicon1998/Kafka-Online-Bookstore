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
        let genres = await db.Genre.find();
        return res.status(200).json(genres);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundGenre = await db.Genre.findById(req.params.genre_id);
        if(foundGenre) await foundGenre.remove();
        return res.status(200).json(foundGenre);
    } catch(err) {
        return next(err);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let updatedGenre = await db.Genre.findByIdAndUpdate(req.params.genre_id, req.body, {new: true});
        return res.status(200).json(updatedGenre);
    } catch(err) {
        return next(err);
    }
}
