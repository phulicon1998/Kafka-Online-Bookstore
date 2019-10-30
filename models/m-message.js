const mongoose = require("mongoose");

const SYSTEM_MSG = 0;

var messageSchema = new mongoose.Schema({
	type: {
		type: Number,
		default: SYSTEM_MSG
	},
	text: String,
	chat_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat"
	},
	isView: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("Message", messageSchema);
