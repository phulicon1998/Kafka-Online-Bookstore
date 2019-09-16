var mongoose = require("mongoose");

var modelbookSchema = new mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order"
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	discount: Number,
	quantity: Number,
	price: Number,
	cover: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("OrderBook", modelbookSchema);