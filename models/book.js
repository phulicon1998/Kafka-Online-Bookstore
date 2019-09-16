var mongoose = require("mongoose"),
db = require("./index"),
{upload, cloudinary} = require("../middleware/uploader");

var bookSchema = new mongoose.Schema({
	name: String,
	isbn: String,
	desc: String,
	price: {
		type: Number,
		default: 0
	},
	discount: {
		type: Number,
		default: 0
	},
	comment_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	total: {
		type: Number,
		default: 0
	},
	bookcare: {
		type: Boolean,
		default: false
	},
	publish: {
		at: {
			type: Date,
			default: Date.now
		},
		by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Publisher"
		}
	},
	language: {
		type: String,
		default: "English"
	},
	fastDeli: {
		type: Boolean,
		default: false
	},
	amount: {
		type: Number,
		default: 0
	},
	image_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "BookImage"
		}
	]
}, {timestamp: true});

bookSchema.pre("remove", async function() {
	await db.BookImage.deleteMany({"_id" : {$in : this.image_id}})
	await db.Comment.deleteMany({"_id" : {$in : this.comment_id}});
	await db.BookGenre.deleteMany({"book": this._id});
});

module.exports = mongoose.model("Book", bookSchema);
