var mongoose = require("mongoose");

var publisherSchema = new mongoose.Schema({
	name: String,
	desc: {
		type: String,
		set: v => v.length > 0 ? v : "None"
	}
});

module.exports = mongoose.model("Publisher", publisherSchema);
