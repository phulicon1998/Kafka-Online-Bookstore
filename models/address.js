var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
	receiver: String,
	address: String,
	city: String,
	country: String,
	phone: String
})

module.exports = mongoose.model("Address", addressSchema);