var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
	image: String,
	name: String,
	desc: {
		type: String,
		set: v => v.length > 0 ? v : "None"
	},
	follower: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Author", authorSchema);
