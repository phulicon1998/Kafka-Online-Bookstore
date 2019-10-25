var mongoose = require("mongoose");

var orderEditionSchema = new mongoose.Schema({
	order_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order"
	},
	edition_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Edition"
	},
	discount: Number,
	quantity: Number,
	price: Number,
	cover: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("OrderEdition", orderEditionSchema);
