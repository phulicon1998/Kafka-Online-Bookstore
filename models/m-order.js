var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	money: Number,
	fastDelivery: {
		type: Boolean,
		default: false
	},
	status: {
		type: Number,
		default: 0
	},
	receiver: String,
	address: String,
	city: String,
	country: String,
	phone: String
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);
