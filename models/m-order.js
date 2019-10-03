var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	money: Number,
	deliFast: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default: "Working"
	},
	receiver: String,
	address: String,
	city: String,
	country: String,
	phone: String
}, {timestamp: true});

// orderSchema.set('toObject', { getters: true });
// orderSchema.set('toJSON', { getters: true });
//
// function getDate(value){
// 	let dd = value.getDate();
// 	let mm = value.getMonth();
// 	let yy = value.getFullYear();
// 	return `${dd}/${mm+1}/${yy}`;
// }
//
// function getStatus(value){
//     switch (value) {
//         case "Completed":
//             return `<b class="completed"><i class="fas fa-flag-checkered"></i> ${value}</b>`
//             break;
//         case "Cancelled":
//             return `<b class="cancelled"><i class="fas fa-ban"></i>  ${value}</b>`
//             break;
//         default:
//             return `<b class="working"><i class="fas fa-truck"></i> ${value}</b>`
//     }
// }

module.exports = mongoose.model("Order", orderSchema);
