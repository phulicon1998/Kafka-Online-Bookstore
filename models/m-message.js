const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
	type: Number,
	text: String,
	conversation_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation"
	},
	isView: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("Message", messageSchema);
