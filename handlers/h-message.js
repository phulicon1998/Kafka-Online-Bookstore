const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        console.log("run");
    } catch (e) {
        return next(e);
    }
}
