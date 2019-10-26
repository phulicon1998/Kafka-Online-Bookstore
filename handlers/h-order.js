const db = require("../models");

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
        let foundOrder = await db.Order.find({user_id});
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let foundOrder = await db.Order.findById(req.params.order_id);
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}
