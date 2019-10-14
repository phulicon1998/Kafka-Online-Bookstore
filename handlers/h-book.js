const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        const {uploadImg} = req.body;
        console.log(req.body);
        let createdBook = await db.Book.create({...req.body, image: uploadImg});
        let returnBook = await db.Book.findById(createdBook._id).populate("publish.by").exec();
        return res.status(200).json(returnBook);
    } catch(err) {
        console.log(err);
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let books = await db.Book.find().populate("publish.by").exec();
        return res.status(200).json(books);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundBook = await db.Book.findById(req.params.book_id);
        if(foundBook) foundBook.remove();
        return res.status(200).json(foundBook);
    } catch(err) {
        return next(err);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let updatedBook = await db.Book.findByIdAndUpdate(req.params.book_id, req.body, {new: true});
        return res.status(200).json(updatedBook);
    } catch(err) {
        return next(err);
    }
}
