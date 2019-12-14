const mongoose = require("mongoose");
const {spliceId} = require("../utils/dbSupport");
const {cloudinary} = require("../utils/uploader");

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
    review_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    outOfBusiness: {
        type: Boolean,
        default: false
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
    amount: {
        type: Number,
        default: 10
    },
    fastDelivery: {
        type: Boolean,
        default: false
    },
    desc: String,
    verifyStatus: {
        type: Number,
        default: 0
    }
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
