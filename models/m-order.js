var mongoose = require("mongoose");

// WORKING_STATUS = 0
// TRANSPORTING_STATUS = 1
// COMPLETED_STATUS = 2
// CANCELLED_STATUS = 3

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
}, {timestamp: true});

module.exports = mongoose.model("Order", orderSchema);
