const db = require("../models");
const {genToken} = require("../utils/token");
const mail = require("../utils/mail");

exports.getOne = async(req, res, next) => {
    try {
        let foundUser = await db.User.findById(req.params.user_id);
        let {_id, username, email, active, avatar} = foundUser;

        // get role of user
        let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
        let uRole = userRole.map(v => v.role_id);
        let role = uRole.length > 0 ? uRole : false;

        return res.status(200).json({_id, username, email, active, role, avatar});
    } catch(err) {
        return next(err);
    }
}

exports.logIn = async(req, res, next) => {
    try {
        let user = await db.User.findOne({email: req.body.email});
        let {_id, username, email, active, avatar} = user;

        // check whether the account is active
        if(!active) return next({
            status: 400,
            message: "The account is not activated and not ready to use."
        });

        // compare password
        let match = await user.comparePassword(req.body.password);
        if(match){

            // get role of user
            let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
            let uRole = userRole.map(v => v.role_id);
            let role = uRole.length > 0 ? uRole : false;

            // gen token to store on client
            let token = genToken(_id, role);

            return res.status(200).json({_id, username, avatar, email, role, active, token});
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid email/password."
        })
    }
}

exports.signUp = async(req, res, next) => {
    try {
        let user = await db.User.create(req.body);
        let {_id, username, email, active, avatar} = user;

        // gen token for storing on client
        let token = genToken(_id);

        //send activate mail
        mail.activate(email, username, _id, req.headers.host);

        return res.status(200).json({_id, username, avatar, email, active, token});
    } catch(err) {
        return next({
            status: 400,
            message: err.code === 11000 ? "Sorry, that email/password is taken or invalid" : err.message
        })
    }
}

exports.activate = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        if(user) {
            user.active = true;
            await user.save();

            // add role for user
            let role = await db.Role.findOne({code: "001"});
            await db.UserRole.create({role_id: role._id, user_id: user._id});
        }
        return res.status(200).json("Success");
    } catch(err) {
        return next(err);
    }
}
