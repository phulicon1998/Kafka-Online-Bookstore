var mongoose = require("mongoose");

var bookgenreSchema = new mongoose.Schema({
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	genre:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Genre"
	}
})

module.exports = mongoose.model("BookGenre", bookgenreSchema);