const mongoose = require("mongoose");

const userroleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
})

module.exports = mongoose.model("UserRole", userroleSchema);
