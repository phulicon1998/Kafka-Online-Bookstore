const mongoose = require("mongoose");
const db = require("../models");

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	username: String,
	password: {
		type: String,
		required: true
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	shipment_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shipment"
		}
	],
	review_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	],
	active: {
		type: Boolean,
		default: false
	}
});

userSchema.pre("remove", async function() {
	// await db.Order.deleteMany({"user": this._id});
	// await db.Address.deleteMany({"_id": {$in: this.address}});
})

module.exports = mongoose.model("User", userSchema);
