const db = require("../models");
const {pushId} = require("../utils/dbSupport");

module.exports = function(socket) {
    socket.on("create message", async function(message) {
        try {
            // store on db
            let createdMsg = await db.Message.create({...message, status: 1});
            const {conversation_id} = message;
            await pushId("Conversation", conversation_id, "message_id", createdMsg._id);

            let conversation = await db.Conversation.findById(conversation_id).populate("message_id").populate("user_id").exec();

            // If the message is sent by customer
            // Then find and change conversation status to not finished
            if(message.type === 1 && conversation.isFinished) {
                conversation.isFinished = false;
                await conversation.save();

                // Update the waiting list on client
                socket.to("chatApp").emit("new waiter", conversation);
            }

            // Inform sender that the message is sent successfully
            socket.emit("new message", createdMsg);
            // Pass the message to saleman
            socket.to(conversation.name).emit("new message", createdMsg);
        } catch (e) {
            console.log("create message err");
            console.log(e);
        }
    });

    socket.on("customer join", async function({email, _id}) {
        try {
            if(email && _id) {
                let name = `${email.split("@")[0]}-croom`;

                // check if the conversation exist
                let foundConversation = await db.Conversation.findOne({name});
                if(!foundConversation) {
                    // If there is no conversation found, create one
                    let createdConversation = await db.Conversation.create({name, user_id: _id});
                    socket.emit("create conversation", createdConversation);
                }
                socket.join(name);
            }
        } catch (e) {
            console.log(e);
        }
    });

    socket.on("salestaff join", function({name}){
        if(name) {
            socket.join(name)
        }
    })

}
