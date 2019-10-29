const db = require("../models");
const {pushId} = require("../utils/dbSupport");

exports.create = async(req, res, next) => {
    try {
        const {edition_id} = req.params;
        const {uploadImgs} = req.body;
        let createdReview = await db.Review.create({...req.body, images: uploadImgs, edition_id});

        // store the review id to the edition
        await pushId("Edition", createdReview.edition_id, "review_id", createdReview._id);

        return res.status(200).json(createdReview);
    } catch (e) {
        return next(e);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundReview = await db.Review.findById(req.params.review_id);
        if(foundReview) await foundReview.remove();
        return res.status(200).json(foundReview);
    } catch (e) {
        return next(e);
    }
}
