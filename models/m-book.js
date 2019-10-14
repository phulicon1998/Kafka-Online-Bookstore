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
	}
}, {timestamp: true});

bookSchema.pre("remove", async function() {
	cloudinary.v2.uploader.destroy(this.image.cloud_id);
});

module.exports = mongoose.model("Book", bookSchema);
