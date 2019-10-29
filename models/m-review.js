const mongoose = require("mongoose");
const {spliceId} = require("../utils/dbSupport");
const {cloudinary} = require("../utils/uploader");

const reviewSchema = new mongoose.Schema({
	edition_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Edition"
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
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
}, {
	timestamps: true
});

reviewSchema.pre("remove", async function(next) {
	try {
		for(let img of this.images) {
			cloudinary.v2.uploader.destroy(img.cloud_id);
		}
		await spliceId("Edition", this.edition_id, "review_id", this._id);
		return next();
	} catch (e) {
		return next(e);
	}
})

module.exports = mongoose.model("Review", reviewSchema);
