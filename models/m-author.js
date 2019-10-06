var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
	image: String,
	name: String,
	desc: String,
	follower: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Author", authorSchema);
