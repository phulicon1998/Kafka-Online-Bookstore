var mongoose = require("mongoose");
	
var commentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	time: {
		type: Date,
		default: Date.now
	},
	title: String,
	rate: Number,
	review: String
});

module.exports = mongoose.model("Comment", commentSchema);