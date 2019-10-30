const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
	name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    handler_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Chat", chatSchema);
