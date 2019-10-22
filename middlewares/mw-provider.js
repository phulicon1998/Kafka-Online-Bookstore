const jwt = require("jsonwebtoken");
const db = require("../models");

exports.getId = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET);
        if(payload) {
            let foundProvider = await db.Provider.findOne({user_id: payload._id});
            if(foundProvider) req.body.provider_id = foundProvider._id;
            return next();
        } else {
            return next({status: 405, message: "Action is not permitted."})
        }
    } catch (e) {
        return next(e);
    }
}
