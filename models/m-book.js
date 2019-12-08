const mongoose = require("mongoose");
const db = require("./index");
const {cloudinary} = require("../utils/uploader");

var bookSchema = new mongoose.Schema({
	name: String,
	isbn: String,
	bookcare: {
		type: Boolean,
		default: false
	},
	image: {
		url: {
			type: String,
			required: true
		},
		cloud_id: {
			type: String,
			required: true
		}
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
	edition_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Edition"
		}
	],
	reviewed: {
		type: Boolean,
		default: true
	}
}, {timestamps: true});

bookSchema.pre("remove", async function(next) {
	try {
		cloudinary.v2.uploader.destroy(this.image.cloud_id);
		await db.BookGenre.deleteMany({book_id: this._id});
		await db.BookAuthor.deleteMany({book_id: this._id});
		return next();
	} catch(err) {
		return next(err);
	}
});

module.exports = mongoose.model("Book", bookSchema);
