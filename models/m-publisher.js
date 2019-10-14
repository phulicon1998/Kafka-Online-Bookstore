var mongoose = require("mongoose");

var publisherSchema = new mongoose.Schema({
	name: String,
	desc: String
});

module.exports = mongoose.model("Publisher", publisherSchema);
