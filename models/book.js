const mongoose = require("mongoose");
const db = require("./index");
const {upload, cloudinary} = require("../middleware/uploader");

var bookSchema = new mongoose.Schema({
	name: String,
	isbn: String,
	desc: String,
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
	}
}, {timestamp: true});

bookSchema.pre("remove", async function() {
	// await db.BookImage.deleteMany({"_id" : {$in : this.image_id}})
	// await db.Comment.deleteMany({"_id" : {$in : this.comment_id}});
	// await db.BookGenre.deleteMany({"book": this._id});
});

module.exports = mongoose.model("Book", bookSchema);
