const mongoose = require("mongoose");
const db = require("./index");

var bookImageSchema = new mongoose.Schema({
	cloud_id: String,
	link: String,
	forCover: {
		type: Boolean,
		default: false
	}
});

bookImageSchema.pre("remove", async function(){
	// let book = await db.Book.find({moreImage: this._id});
	// let newImages = book.moreImage.filter(val => val !== this._id);
	// book.moreImage = newImages;
	// book.save();
})

module.exports = mongoose.model("BookImage", bookImageSchema);
