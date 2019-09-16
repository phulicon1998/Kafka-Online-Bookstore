var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	quantity: Number
});

module.exports = mongoose.model("Cart", cartSchema);