const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let conversations = await db.Conversation.find().populate("user_id").populate("message_id").lean().exec();

        // Gather conversations which have unseen messages
        let hasMsgConversations = conversations.filter(v => v.message_id.length > 0);
        let unseenMsgConversations = hasMsgConversations.filter(v => v.message_id.some(msg => !msg.isView));

        return res.status(200).json(unseenMsgConversations);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let foundConversation = await db.Conversation.findOne({user_id}).populate("message_id").lean().exec();
        return res.status(200).json(foundConversation);
    } catch (e) {
        return next(e);
    }
}

exports.create = async(req, res, next) => {
    try {
        // Check whether the conversation room has been created
        const {user_id} = req.params;
        let foundConversation = await db.Conversation.findOne({user_id});
        let conversation_id;
        if(!foundConversation) {
            // Make a name for the conversation
            let userData = await db.User.findById(user_id);
            const {email} = userData;
            let name = `${email.split("@")[0]}-croom`;

            // Create the conversation for the user
            let createdConversation = await db.Conversation.create({name, user_id});

            // Create the message and push id to conversation
            let createdMessage = await db.Message.create({...req.body, conversation_id: createdConversation._id});
            createdConversation.message_id.push(createdMessage._id);
            await createdConversation.save();

            return res.status(200).json(createdMessage);
        } else {
            // Create the message and push id to conversation
            let createdMessage = await db.Message.create({...req.body, conversation_id: foundConversation._id});
            foundConversation.message_id.push(createdMessage._id);
            await foundConversation.save();

            return res.status(200).json(createdMessage);
        }
    } catch (e) {
        return next(e);
    }
}
