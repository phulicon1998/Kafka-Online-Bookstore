const mongoose = require("mongoose");
const {spliceId} = require("../utils/dbSupport");
const {cloudinary} = require("../utils/uploader");

// QUALITY CONTROLS
const BRAND_NEW = 1;
const LIKE_NEW = 2;
const GOOD = 3;
const ACCEPTABLE = 4;

const editionSchema = mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            cloud_id: {
                type: String,
                required: true
            }
        }
    ],
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    quality: {
        type: Number,
        required: true
    },
    fastDelivery: {
        type: Boolean,
        default: false
    },
    desc: String
}, {
    timestamps: true
})

editionSchema.pre("remove", async function(next) {
	try {
        for(let img of this.images) {
            cloudinary.v2.uploader.destroy(img.cloud_id);
        }
        await spliceId("Book", this.book_id, "edition_id", this._id);
		return next();
	} catch(err) {
		return next(err);
	}
});

module.exports = mongoose.model("Edition", editionSchema);
