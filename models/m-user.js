const mongoose = require("mongoose");
// const db = require("../models");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
	avatar: {
		link: {
			type: String,
			default: "https://res.cloudinary.com/kafkabookstore/image/upload/v1570431730/download_iyhtmw.jpg"
		},
		cloud_id: {
			type: String,
			default: ""
		}
	},
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
	active: {
		type: Boolean,
		default: false
	}
});

userSchema.pre("save", async function(next){
    try {
        //only hash the password if it is modified or new
        if(!this.isModified("password")) return next();

        let hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.pre("remove", async function() {
	// await db.Order.deleteMany({"user": this._id});
	// await db.Address.deleteMany({"_id": {$in: this.address}});
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
}

module.exports = mongoose.model("User", userSchema);
