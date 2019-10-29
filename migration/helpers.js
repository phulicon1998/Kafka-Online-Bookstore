const db = require("../models");

const docsToData = (data) => {
    let hdData = data.map(d => ({...d}));
    hdData.forEach(d => {
        d._old_id = d._id;
        delete d._id;
        delete d.__v;
    })
    return hdData;
}

const docToData = d => {
    const data = {...d};
    data._old_id = data._id;
    delete data._id;
    delete data.__v;
    return data;
}

// The passing value for parameter spliceIdDocs must look like below:
// spliceIdDocs = [{
//     model,
//     findCol (depend on manySchema),
//     emptyCol
// }]
async function getAndRemoveOldData(manySchema, spliceIdDocs, schemaName) {
    // check if "manySchema" is the name of the manySchema
    // or the manySchema's list of docs then get and store data
    let docs, docsData;
    let validString = typeof manySchema === "string" || manySchema instanceof String;
    let validArray = typeof manySchema === "object" && manySchema.constructor === Array;
    if(validString) {
        docs = await db[manySchema].find().lean().exec();
        docsData = docsToData(docs);
    } else if(validArray) {
        docs = manySchema;
        docsData = docsToData(manySchema);
    }

    // Clear all the manySchema id inside the oneSchema's doc prop
    if(spliceIdDocs.length > 0) {
        for(let one of spliceIdDocs) {
            const {model, findCol, emptyCol} = one;

            for(let doc of docs){
                let foundOne = await db[model].findById(doc[findCol]);
                if(foundOne && foundOne[emptyCol].length > 0){
                    foundOne[emptyCol] = [];
                    await foundOne.save();
                }
            }
        }
    }

    // Remove old data by id
    let docIds = docsData.map(v => v._old_id);
    await db[validString ? manySchema : schemaName].deleteMany({_id: {$in: docIds}});

    return docsData;
}

module.exports = {
    docsToData,
    docToData,
    getAndRemoveOldData
}
