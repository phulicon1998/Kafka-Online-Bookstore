const db = require("../models");
const {docsToData, docToData, getAndRemoveOldData} = require("./helpers");
const {assignId, pushId} = require("../utils/dbSupport");

async function newMigrateEdition() {
    try {
        console.log("- MIGRATING EDITION...");

        // Retrieve edition data and remove in database
        const spliceIdDocs = [
            {model: "Book", findCol: "book_id", emptyCol: "edition_id"}
        ]
        let editionData = await getAndRemoveOldData("Edition", spliceIdDocs);

        for(let edition of editionData) {
            // Retrieve orderEdition data and remove in database
            let orderEditions = await db.OrderEdition.find({edition_id: edition._old_id}).lean().exec();
            let orderEditionData = await getAndRemoveOldData(orderEditions, [], "OrderEdition");

            // re-create Edition data in db
            let newEdition = await db.Edition.create(edition);

            // re-create OrderEdition data (with newEdition id) in db
            orderEditionData.forEach(v => v.edition_id = newEdition._id);
            await db.OrderEdition.insertMany(orderEditionData);

            // Replace edition id with newEdition id inside all review data
            for(let review_id of newEdition.review_id) {
                await assignId("Review", review_id, "edition_id", newEdition._id);
            }

            // Store new edition id inside Book doc
            await pushId("Book", newEdition.book_id, "edition_id", newEdition._id);
        }

    } catch (e) {
        console.log(e);
    }
}

module.exports = newMigrateEdition;
