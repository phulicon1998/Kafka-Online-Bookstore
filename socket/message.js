const db = require("../models");
const {pushId} = require("../utils/dbSupport");

module.exports = function(socket) {
    socket.on("create", async function(message) {
        try {
            // store on db
            let createdMsg = await db.Message.create(message);
            const {conversation_id} = message;
            await pushId("Conversation", conversation_id, "message_id", createdMsg._id);

            // send back to everyone
            socket.emit("new message", message);
            socket.broadcast.to("a").emit("new message", message);
        } catch (e) {
            console.log(e);    
        }
    });

    socket.on("join", async function({name, user_id}) {
        // check if the conversation exist
        let foundConversation = await db.Conversation.findOne({name});
        if(!foundConversation && user_id) {
            // If there is no conversation found, create one
            let createdConversation = await db.Conversation.create({name, user_id});
            socket.emit("create conversation", createdConversation);
        }
        socket.join(name);
    });
}
