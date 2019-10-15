var mongoose = require("mongoose");

var bookAuthorSchema = new mongoose.Schema({
	book_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author"
	}
})

module.exports = mongoose.model("BookAuthor", bookAuthorSchema);
