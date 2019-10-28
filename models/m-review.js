const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	edition_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Edition"
	},
	images: [
		{
			url: String,
			cloud_id: String
		}
	],
	rate: {
		type: Number,
		default: 0
	},
	title: String,
	content: String,
	userLiked: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
}, {timestamp: true});

module.exports = mongoose.model("Review", reviewSchema);
