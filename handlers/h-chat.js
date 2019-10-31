const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let foundChat = await db.Chat.findOne({user_id}).populate("message_id").lean().exec();
        return res.status(200).json(foundChat);
    } catch (e) {
        return next(e);
    }
}
