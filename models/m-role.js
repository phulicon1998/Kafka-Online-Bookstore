const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    type: String,
    code: String
})

module.exports = mongoose.model("Role", roleSchema);
