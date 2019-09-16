var mongoose = require("mongoose");

var supplierSchema = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model("Supplier", supplierSchema);