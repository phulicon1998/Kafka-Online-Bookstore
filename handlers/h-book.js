const db = require("../models");
const {cloudinary} = require("../utils/uploader");
const {gatherDataById} = require("../manipulate");

async function getReturnBookData(id, genres, authors) {
    // get the returned data to update on client
    let book = await db.Book.findById(id).populate("publish.by").lean().exec();
    book.genres = gatherDataById(id, "genre_id", genres);
    book.authors = gatherDataById(id, "author_id", authors);

    return book;
}

async function updateDataList(book_id, newData_ids, dataModel, dataType, currentData){
    let currentData_ids = gatherDataById(book_id, dataType, currentData).map(v => v._id);
    let isChanged = JSON.stringify(newData_ids) !== JSON.stringify(currentData_ids);

    if(isChanged) {
        // compare old and new data & divided into three types for interaction
        let remaineds = currentData_ids.filter(v => newData_ids.indexOf(v) !== -1);
        let removeds = currentData_ids.filter(v => newData_ids.indexOf(v) === -1);
        let news = newData_ids.filter(v => remaineds.indexOf(v) === -1);

        // remove old data
        await db[dataModel].deleteMany({book_id, [dataType]: {$in: removeds} });

        // add new data
        for(let id of news) {
            await db[dataModel].create({book_id, [dataType]: id});
        }
    }
}

exports.create = async(req, res, next) => {
    try {
        // get uploaded image content (url and public id)
        const {uploadImg, genreIds, authorIds} = req.body;

        // get list of selected id of author and genre
        let genre_ids = JSON.parse(genreIds);
        let author_ids = JSON.parse(authorIds);

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

        // // get the returned data to update on client
        let returnBook = await getReturnBookData(createdBook._id, genres, authors);

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

exports.getForStore = async(req, res, next) => {
    try {
        // retrieves all the authors
        let authors = await db.BookAuthor.find().populate("author_id").exec();

        let books = await db.Book.find().populate("edition_id").lean().exec();

        books.forEach(b => {
            // Retrieve the best deal of each book
            let bestDeal = b.edition_id.reduce((acc, next) => {
                let accMoney = acc.price * (100 - acc.discount) / 100;
                let nextMoney = next.price * (100 - next.discount) / 100;
                return accMoney <= nextMoney ? acc : next;
            })
            b.bestDeal = bestDeal;
            b.authors = gatherDataById(b._id, "author_id", authors);
        })
        return res.status(200).json(books);
    } catch (e) {
        console.log(e);
        return next(e);
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
        const {uploadImg, genreIds, authorIds} = req.body;

        // get list id of author and genre
        let genre_ids = JSON.parse(genreIds);
        let author_ids = JSON.parse(authorIds);

        // Retrieve the current book
        let currentBook = await db.Book.findById(req.params.book_id);

        // Retrieve all the current genre and author
        let currentBookGenres = await db.BookGenre.find().populate("genre_id").exec();
        let currentBookAuthors = await db.BookAuthor.find().populate("author_id").exec();

        // update list genre id and list author id of the book if changes
        await updateDataList(currentBook._id, genre_ids, "BookGenre", "genre_id", currentBookGenres);
        await updateDataList(currentBook._id, author_ids, "BookAuthor", "author_id", currentBookAuthors);

        // Update the image if changes made
        if(uploadImg) {
            cloudinary.v2.uploader.destroy(currentBook.image.cloud_id);
            currentBook.image = uploadImg;
        }
        currentBook.publish = {
            at: req.body["publish.at"],
            by: req.body["publish.by"]
        }
        await currentBook.save();

        // update all the text data
        const {name, isbn, language, bookcare} = req.body;
        await db.Book.findByIdAndUpdate(currentBook._id, {name, isbn, language, bookcare});

        // Retrieve all the genre and author again for returning to client
        let genres = await db.BookGenre.find().populate("genre_id").exec();
        let authors = await db.BookAuthor.find().populate("author_id").exec();
        let returnBook = await getReturnBookData(currentBook._id, genres, authors);

        return res.status(200).json(returnBook);
    } catch(err) {
        console.log(err);
        return next(err);
    }
}
