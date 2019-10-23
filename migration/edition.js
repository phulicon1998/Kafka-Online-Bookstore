const db = require("../models");

async function migrateEdition() {
    try {
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

        // remove some unneccessary properties
        let editionData = editions.map(e => ({...e}));
        editionData.forEach(v => {
            delete v["_id"];
            delete v["__v"];
        });

        // Remove all the old edtion
        let listId = editions.map(v => v._id);
        await db.Edition.deleteMany({_id: {$in: listId}});

        // Re-create old data with new Edition model
        let createdList = await db.Edition.insertMany(editionData);

        // Store new edition id inside book document
        for(let e of createdList) {
            let foundBook = await db.Book.findById(e.book_id);
            if(foundBook){
                foundBook.edition_id.push(e._id);
                await foundBook.save();
            }
        }

        console.log("[ EDITION MIGRATION COMPLETED ]");
    } catch (e) {
        console.log(e);
    }
}

module.exports = migrateEdition;
