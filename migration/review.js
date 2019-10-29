const db = require("../models");
const {docToData, docsToData, getAndRemoveOldData} = require("./helpers");
const {pushId} = require("../utils/dbSupport");

async function migrateReview() {
    try {
        console.log("- MIGRATING REVIEW...");

        // Retrieve data and remove in database
        const spliceIdDocs = [
            {model: "Edition", findCol: "edition_id", emptyCol: "review_id"}
        ]
        let reviewData = await getAndRemoveOldData("Review", spliceIdDocs);

        // Store new review data and push id to edition
        for(let d of reviewData) {
            let createdReview = await db.Review.create(d);
            await pushId("Edition", createdReview.edition_id, "review_id", createdReview._id);
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = migrateReview;
