const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        let createdPublisher = await db.Publisher.create(req.body);
        return res.status(200).json(createdPublisher);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let publishers = await db.Publisher.find();
        return res.status(200).json(publishers);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundPublisher = await db.Publisher.findById(req.params.publisher_id);
        if(foundPublisher) foundPublisher.remove();
        return res.status(200).json(foundPublisher);
    } catch(err) {
        return next(err);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let updatedPublisher = await db.Publisher.findByIdAndUpdate(req.params.publisher_id, req.body, {new: true});
        return res.status(200).json(updatedPublisher);
    } catch(err) {
        return next(err);
    }
}
