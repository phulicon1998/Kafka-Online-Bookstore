var mongoose = require("mongoose");

var providerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	email: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model("Provider", providerSchema);
