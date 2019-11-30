const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
	type: Number, // 1 is for CUSTOMER and 0 for SYSTEM USER
	text: String,
	status: Number,
	conversation_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation"
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("Message", messageSchema);
