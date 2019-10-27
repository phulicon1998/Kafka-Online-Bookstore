const db = require("../models");
const {docsToData, docToData} = require("./helpers");

async function migrateEdition() {
    try {
        console.log("- MIGRATING EDITION...");
        // get all the data of the old model under the POJO form
        let editions = await db.Edition.find().lean().exec();

        // get the list of book id (unique id)
        let listBookId = editions.map(e => e.book_id);
        let listUniqueBookId = listBookId.filter((v, i) => listBookId.indexOf(v) === i);

        // Clear all the old Edtion id inside Book document
        for(let id of listUniqueBookId){
            let foundBook = await db.Book.findById(id);
            if(foundBook){
                foundBook.edition_id = [];
                await foundBook.save();
            }
        }

        for(let edition of editions) {
            // Get all the edition data inside each order and convert to POJO
            let orderEditions = await db.OrderEdition.find({edition_id: edition._id}).lean().exec();
            let orderEditionData = docsToData(orderEditions);

            // Remove all old order's editions data
            const orderEditionIds = orderEditions.map(v => v._id);
            await db.OrderEdition.deleteMany({"_id": { $in: orderEditionIds }});

            // Convert edition doc to POJO and recreate edition data
            let editionData = docToData(edition);
            let newEdition = await db.Edition.create(editionData);

            // Recreate order edition data
            orderEditionData.forEach(v => v.edition_id = newEdition._id);
            await db.OrderEdition.insertMany(orderEditionData);

            // Store new edition id inside Book doc
            let foundBook = await db.Book.findById(newEdition.book_id);
            if(foundBook){
                foundBook.edition_id.push(newEdition._id);
                await foundBook.save();
            }
        }

        // Remove all the old edtion
        let listId = editions.map(v => v._id);
        await db.Edition.deleteMany({_id: {$in: listId}});
    } catch (e) {
        console.log(e);
    }
}

module.exports = migrateEdition;
