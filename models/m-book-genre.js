var mongoose = require("mongoose");

var bookGenreSchema = new mongoose.Schema({
	book_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	genre_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Genre"
	}
})

module.exports = mongoose.model("BookGenre", bookGenreSchema);
