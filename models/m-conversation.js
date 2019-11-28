const mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
	name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    handler_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
	isFinished: {
		type: Boolean,
		default: true
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

module.exports = mongoose.model("Conversation", conversationSchema);
