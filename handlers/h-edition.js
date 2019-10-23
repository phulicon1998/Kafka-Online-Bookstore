const db = require("../models");
const {gatherDataById} = require("../manipulate");

exports.get = async(req, res, next) => {
    try {
        let editions = await db.Edition.find().populate("book_id").populate("provider_id").exec();
        return res.status(200).json(editions);
    } catch(err) {
        return next(err);
    }
}

exports.getInCart = async(req, res, next) => {
    try {
        // get the list id and retrieve the data by id
        let listId = req.body.list.map(v => v.edition_id);
        let editions = await db.Edition.find({_id: {$in: listId}}).populate("book_id").lean().exec();

        // retrieves all the authors
        let authors = await db.BookAuthor.find().populate("author_id").exec();
        editions.forEach(e => {
            e.authors = gatherDataById(e.book_id._id, "author_id", authors);
        });

        return res.status(200).json(editions);
    } catch (e) {
        return next(e);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {uploadImgs, book_id} = req.body;
        let createdEdition = await db.Edition.create({...req.body, images: uploadImgs});

        // Find the subject book for pushing the created edition id
        let foundBook = await db.Book.findById(book_id);
        if(foundBook) {
            foundBook.edition_id.push(createdEdition._id);
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
        return next(e);
    }
}
