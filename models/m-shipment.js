var mongoose = require("mongoose");
const {spliceId} = require("../utils/dbSupport");

var shipmentSchema = new mongoose.Schema({
	receiver: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
})

shipmentSchema.pre("remove", async function(next) {
	try {
		await spliceId("User", this.user_id, "shipment_id", this._id);
		return next();
	} catch(err) {
		return next(err);
	}
});

module.exports = mongoose.model("Shipment", shipmentSchema);
