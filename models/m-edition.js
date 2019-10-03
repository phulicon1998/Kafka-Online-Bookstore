const mongoose = require("mongoose");

const editionSchema = mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    bookimage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookImage"
    },
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }
})

mongoose.exports = mongoose.model("Edition", editionSchema);
