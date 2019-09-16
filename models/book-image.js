var mongoose = require("mongoose"),
	db = require("./index");

var bookImageSchema = new mongoose.Schema({
	cloudId: String,
	url: String,
	main: {type: Boolean, default: false}
});

// improved function
// bookImageSchema.pre("remove", async function(){
// 	let book = await db.Book.find({moreImage: this._id});
// 	let newImages = book.moreImage.filter(val => val !== this._id);
// 	book.moreImage = newImages;
// 	book.save();
// })

module.exports = mongoose.model("BookImage", bookImageSchema);