var mongoose = require("mongoose");

var bookMoreSchema = new mongoose.Schema({
	book_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	genre_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Genre"
	},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author"
	}
})

module.exports = mongoose.model("BookMore", bookMoreSchema);
