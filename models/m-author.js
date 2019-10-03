var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
	image: String,
	name: String,
	description: String,
	follower: Number
});

module.exports = mongoose.model("Author", authorSchema);