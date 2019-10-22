const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        let editions = await db.Edition.find().populate("book_id").populate("provider_id").exec();
        return res.status(200).json(editions);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {uploadImgs, book_id} = req.body;
        let createdEdition = await db.Edition.create({...req.body, images: uploadImgs});

        // Find the subject book for pushing the created edition id
        let foundBook = await db.Book.findById(book_id);
        if(foundBook) {
            foundBook.edition_id.push(book_id);
            await foundBook.save();
        }

        return res.status(200).json(createdEdition);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundEdition = await db.Edition.findById(req.params.edition_id);
        if(foundEdition) await foundEdition.remove();
        return res.status(200).json(foundEdition);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}
