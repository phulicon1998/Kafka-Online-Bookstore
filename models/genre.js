var mongoose = require("mongoose"),
	db = require("../models");

var genreSchema = new mongoose.Schema({
	name: String,
	description: String
})

genreSchema.pre("remove", async function(){
	// await db.BookGenre.deleteMany({"genre": this._id});
})

module.exports = mongoose.model("Genre", genreSchema);
