/* This file is for manipulating data which is related a lot to the database the
system is using. DO NOT USE THIS FILE FOR DEVELOPING ANY OTHER DIFFERENT SYSTEM */

function gatherDataById(id, dataType, gatherData) {
    return gatherData.filter(v => v.book_id.equals(id)).map(v => v[dataType]);
}

module.exports = { gatherDataById }
