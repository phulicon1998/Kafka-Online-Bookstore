var mongoose = require("mongoose");

var providerSchema = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model("Provider", providerSchema);
