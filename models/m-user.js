var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	db						= require("../models");

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String, 
		unique: true,
		required: true
	},
	password: String,
	viewname: String,
	role: Number,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	address: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address"
		}
	]
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre("remove", async function() {
	await db.Order.deleteMany({"user": this._id});
	await db.Address.deleteMany({"_id": {$in: this.address}});
})

module.exports = mongoose.model("User", userSchema);
