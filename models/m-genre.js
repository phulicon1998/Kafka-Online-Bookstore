const mongoose = require("mongoose");
const db = require("../models");

var genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		set: v => v.length > 0 ? v : "None"
	}
})

genreSchema.pre("remove", async function(){
	// await db.BookGenre.deleteMany({"genre": this._id});
})

module.exports = mongoose.model("Genre", genreSchema);
