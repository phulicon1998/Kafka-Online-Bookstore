const db = require("../models");

/*
    Remove a record's id from a document's collumn (which contains an array) of
    different schema which is found by using document ID.
*/
exports.spliceId = async(findSchema, findId, spliceCol, spliceId) => {
    try {
        let foundDoc = await db[findSchema].findById(findId);
        if(foundDoc){
            foundDoc[spliceCol].splice(foundDoc[spliceCol].indexOf(spliceId), 1);
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

/*
    Push a record's id to a document's collumn (which contains an array) of
    different schema which is found by using document ID.
*/
exports.pushId = async(findSchema, findId, pushCol, pushId) => {
    try {
        let foundDoc = await db[findSchema].findById(findId);
        if(foundDoc) {
            foundDoc[pushCol].push(pushId);
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

/*
    Assign a record's id to a document's collumn (which is String) of
    different schema which is found by using document ID.
*/
exports.assignId = async(findSchema, findId, assignCol, assignId) => {
    try {
        let foundDoc = await db[findSchema].findById(findId);
        if(foundDoc) {
            foundDoc[assignCol] = assignId ? assignId : undefined;
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

/*
    Casade delete a list of record by using a list of ID
*/
exports.casDeleteMany = async(schema, listId) => {
    try {
        for(let id of listId){
            let foundDoc = await db[schema].findById(id);
            if(foundDoc) await foundDoc.remove();
        }
    } catch(err) {
        console.log("run");
        console.log(err);
    }
}

/*
    Casade delete one record depend on collumn value
*/
exports.casDelete = async(findSchema, findCol, findVal) => {
    try {
        let fDoc = await db[findSchema].findOne({[findCol]: findVal});
        if(fDoc) await fDoc.remove();
    } catch(err) {
        console.log(err);
    }
}
