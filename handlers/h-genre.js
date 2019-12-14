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

exports.report = async(req, res, next) => {
    try {
        // Get all the genre data
        let genres = await db.BookGenre.find().populate("genre_id").populate("book_id").lean().exec();

        // Group all book by each genre
        let groupBookByGenre = genres.reduce((a, n) => {
            let name = a.map(g => g.name);
            if(name.indexOf(n.genre_id.name) === -1) {
                a.push({
                    _id: n.genre_id._id,
                    name: n.genre_id.name,
                    book_id: [
                        {
                            _id: n.book_id._id,
                            name: n.book_id.name
                        }
                    ]
                })
            } else {
                a.forEach(g => {
                    if(g.name === n.genre_id.name) {
                        g.book_id.push({
                            _id: n.book_id._id,
                            name: n.book_id.name
                        });
                    }
                })
            }
            return a;
        }, [])

        // Get all the complete orders
        let orderEditions = await db.OrderEdition.find().populate("order_id").populate({
            path: "edition_id",
            populate: {
                path: "book_id",
            }
        }).lean().exec();
        let completedOrderEditions = orderEditions.filter(oe => oe.order_id.status === 2).map(oe => ({
            quantity: oe.quantity,
            realPrice: oe.price * ((100 - oe.discount) / 100) * oe.quantity,
            order_id: oe.order_id._id,
            book_id: {
                _id: oe.edition_id.book_id._id,
                name: oe.edition_id.book_id.name,
            }
        }));

        // Group all order by each book
        let groupOrderByBook = completedOrderEditions.reduce((a, n) => {
            let name = a.map(g => g.name);
            if(name.indexOf(n.book_id.name) === -1) {
                a.push({
                    _id: n.book_id._id,
                    name: n.book_id.name,
                    order_id: [
                        {
                            _id: n.order_id,
                            quantity: n.quantity,
                            price: n.realPrice
                        }
                    ]
                })
            } else {
                a.forEach(g => {
                    if(g.name === n.book_id.name) {
                        g.order_id.push({
                            _id: n.order_id,
                            quantity: n.quantity,
                            price: n.realPrice
                        });
                    }
                })
            }
            return a;
        }, [])

        // Merge groupBookByGenre and groupOrderByBook
        groupBookByGenre.forEach(genre => {
            genre.book_id.forEach(gbook => {
                groupOrderByBook.forEach(obook => {
                    if(gbook.name === obook.name) {
                        gbook.order_id = obook.order_id;
                    }
                })
            })
        })

        // Remove all book which has no order
        groupBookByGenre.forEach(genre => {
            genre.book_id = genre.book_id.filter(b => b.order_id)
        })

        return res.status(200).json(groupBookByGenre);
    } catch (e) {
        return next(e);
    }
}
