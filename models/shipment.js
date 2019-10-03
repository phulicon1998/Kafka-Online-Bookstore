var mongoose = require("mongoose");

var shipmentSchema = new mongoose.Schema({
	receiver: String,
	address: String,
	city: String,
	country: String,
	phone: String
})

module.exports = mongoose.model("Shipment", shipmentSchema);
