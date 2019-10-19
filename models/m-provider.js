var mongoose = require("mongoose");
const db = require("../models");

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

providerSchema.pre("remove", async function(next){
	try {
		let foundRole = await db.Role.findOne({code: "005"});
		let foundUserRole = await db.UserRole.findOne({role_id: foundRole._id, user_id: this.user_id});
		if(foundUserRole) await foundUserRole.remove();
		return next();
	} catch(err) {
		return next(err);
	}
});

module.exports = mongoose.model("Provider", providerSchema);
