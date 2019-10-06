const db = require('../models');

exports.get = async(req, res, next) => {
    try {
        let authors = await db.Author.find();
        return res.status(200).json(authors);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let createdAuthor = await db.Author.create(req.body);
        return res.status(200).json(createdAuthor);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundAuthor = await db.Author.findById(req.params.author_id);
        if(foundAuthor) foundAuthor.remove();
        return res.status(200).json(foundAuthor);
    } catch(err) {
        return next(err);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let updatedAuthor = await db.Author.findByIdAndUpdate(req.params.author_id, req.body, {new: true});
        return res.status(200).json(updatedAuthor);
    } catch(err) {
        return next(err);
    }
}
