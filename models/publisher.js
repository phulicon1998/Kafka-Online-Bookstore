var mongoose = require("mongoose");

var publisherSchema = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model("Publisher", publisherSchema);