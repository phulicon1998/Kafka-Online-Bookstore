const db = require("../models");
const {gatherDataById} = require("../manipulate");

exports.create = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        const {orderEditions, order} = req.body;

        // Create the Order and get the order id
        let createdOrder = await db.Order.create({...order, user_id});

        // Using the created order id for creating OrderItem
        for(let e of orderEditions) {
            await db.OrderEdition.create({
                order_id: createdOrder._id,
                ...e
            });
        }

        return res.status(200).json(createdOrder);
    } catch (e) {
        return next(e);
    }
}

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let foundOrder = await db.Order.find(user_id ? {user_id} : {});
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let foundOrder = await db.Order.findById(order_id).lean().exec();
        // get list of order item
        let foundOrderEdition = await db.OrderEdition.find({order_id}).populate({
            path: "edition_id",
            populate: {
                path: "book_id"
            }
        }).lean().exec();

        // add author for each book (access through edition)
        let bookauthors = await db.BookAuthor.find().populate("author_id").exec();
        foundOrderEdition.forEach(e => {
            e.edition_id.book_id.authors = gatherDataById(e.edition_id.book_id._id, "author_id", bookauthors);
        })

        // add orderEdtion to Order
        foundOrder.items = foundOrderEdition;

        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}

exports.edit = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let foundOrder = await db.Order.findById(order_id);
        if(foundOrder) {
            foundOrder.status = req.body.status;
            await foundOrder.save();
        }
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}
