const db = require("../models");
const {pushId} = require("../utils/dbSupport");

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let foundShipments = await db.Shipment.find({user_id});
        return res.status(200).json(foundShipments);
    } catch (e) {
        return next(e);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let createdShipment = await db.Shipment.create({...req.body, user_id});
        await pushId("User", user_id, "shipment_id", createdShipment._id);
        return res.status(200).json(createdShipment);
    } catch (e) {
        return next(e);
    }
}

exports.remove = async(req, res, next) => {
    try {
        const {user_id, shipment_id} = req.params;
        let foundShipment = await db.Shipment.findById(shipment_id);
        if(foundShipment) await foundShipment.remove();

        return res.status(200).json(foundShipment);
    } catch(err) {
        return next(err);
    }
}
