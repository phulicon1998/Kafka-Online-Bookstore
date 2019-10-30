const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        // Check whether the chat room has been created
        const {user_id} = req.params;
        let foundChat = await db.Chat.findOne({user_id});
        let chat_id;
        if(!foundChat) {
            // If there is no chat room, => first time chat => create chat room
            let userData = await db.User.findById(user_id);

            // Create a name for the chat room
            const {email} = userData;
            let name = `${email.split("@")[0]}-croom`;

            // Create the chat room
            let createdChat = await db.Room.create({name, user_id});

            // Create the message and push id to chat
            let createdMessage = await db.Message.create({...req.body, createdChat._id});
            createdChat.message_id.push(createdMessage._id);
            await createdChat.save();

            return res.status(200).json(createdMessage);
        } else {
            // Create the message and push id to chat
            let createdMessage = await db.Message.create({...req.body, foundChat._id});
            foundChat.message_id.push(createdMessage._id);
            await foundChat.save();

            return res.status(200).json(createdMessage);
        }
    } catch (e) {
        return next(e);
    }
}
