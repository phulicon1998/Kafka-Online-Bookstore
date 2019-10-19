const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        // Add role for user
        const {user_id} = req.params;
        let role = await db.Role.findOne({code: "005"});
        await db.UserRole.create({user_id, role_id: role._id});

        // Store provider data
        let provider = await db.Provider.create({...req.body, user_id});
        return res.status(200).json(provider);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let providers = await db.Provider.find().populate("user_id").exec();
        return res.status(200).json(providers);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundProvider = await db.Provider.findById(req.params.provider_id);
        if(foundProvider) await foundProvider.remove();
        return res.status(200).json(foundProvider);
    } catch(err) {
        return next(err);
    }
}
