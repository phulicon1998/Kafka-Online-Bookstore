const db = require("../models");

function gatherDataById(id, typeData, searchData) {
    return searchData.filter(v => v.book_id.equals(id)).map(v => v[typeData]);
}

exports.create = async(req, res, next) => {
    try {
        // get uploaded image content (url and public id)
        const {uploadImg, genreId, authorId} = req.body;

        // get list id of author and genre
        let genre_ids = JSON.parse(genreId);
        let author_ids = JSON.parse(authorId);

        // create book subject, book-genre and book-author
        let createdBook = await db.Book.create({...req.body, image: uploadImg});
        for(let genre_id of genre_ids) {
            await db.BookGenre.create({
                book_id: createdBook._id,
                genre_id
            })
        }
        for(let author_id of author_ids) {
            await db.BookAuthor.create({
                book_id: createdBook._id,
                author_id
            })
        }

        // Retrieve all the genre and author
        let genres = await db.BookGenre.find().populate("genre_id").exec();
        let authors = await db.BookAuthor.find().populate("author_id").exec();

        // get the returned data to update on client
        let returnBook = await db.Book.findById(createdBook._id).populate("publish.by").lean().exec();
        returnBook.genres = gatherDataById(createdBook._id, "genre_id", genres);
        returnBook.authors = gatherDataById(createdBook._id, "author_id", authors);

        return res.status(200).json(returnBook);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        // Retrieve all the genre and author
        let genres = await db.BookGenre.find().populate("genre_id").exec();
        let authors = await db.BookAuthor.find().populate("author_id").exec();

        // get all the book and arrange genre and author following each book
        let books = await db.Book.find().populate("publish.by").lean().exec();
        books.forEach(b => {
            b.genres = gatherDataById(b._id, "genre_id", genres);
            b.authors = gatherDataById(b._id, "author_id", authors);
        })

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
