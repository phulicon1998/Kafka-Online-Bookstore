var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
	edition_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Edition"
	},
	bookimage_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "BookImage"
	},
	rate: Number,
	title: String,
	content: String
}, {timestamp: true});

module.exports = mongoose.model("Review", reviewSchema);
