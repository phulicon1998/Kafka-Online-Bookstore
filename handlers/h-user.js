const db = require("../models");
const {genToken} = require("../utils/token");
const mail = require("../utils/mail");

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

exports.social = async(req, res, next) => {
    try {
        console.log(req.body);
    } catch (e) {
        return next(e);
    }
}

exports.activate = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        if(user) {
            user.active = true;
            await user.save();

            // Add role for user
            let role = await db.Role.findOne({code: "001"});
            await db.UserRole.create({role_id: role._id, user_id: user._id});
        }
        return res.status(200).json("Success");
    } catch(err) {
        return next(err);
    }
}

exports.generate = async(req, res, next) => {
    try {
        // Create user
        // assume that sysUser must use real email for getting the account
        const {email, role, password} = req.body;
        let defaultUsername = req.body.email.split("@")[0];
        let sysUser = await db.User.create({
            ...req.body,
            username: defaultUsername,
            active: true
        });

        // Add role for sysUser
        let foundRole = await db.Role.findOne({code: role});
        await db.UserRole.create({role_id: foundRole._id, user_id: sysUser._id});

        // Send mail for user to receive their generated account
        mail.receiveAcc(email, defaultUsername, password);

        // Retrieve the data for rendering on client
        let createdAccount = await db.UserRole.findOne({user_id: sysUser._id}).populate("role_id").populate("user_id").lean().exec();

        return res.status(200).json(createdAccount);
    } catch (e) {
        return next({
            status: 400,
            message: "The entered email has been used. Please try again with a different one."
        });
    }
}

exports.get = async(req, res, next) => {
    try {
        let accounts = await db.UserRole.find().populate("role_id").populate("user_id").lean().exec();
        let customers = accounts.filter(a => a.role_id.code === "001");
        let sales = accounts.filter(a => a.role_id.code === "002");
        let managers = accounts.filter(a => a.role_id.code === "003");
        return res.status(200).json({customers, sales, managers});
    } catch(e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let foundUser = await db.User.findById(req.params.user_id);
        let {_id, username, email, active, avatar} = foundUser;

        // get role of user
        let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
        let uRole = userRole.map(v => v.role_id);
        let role = uRole.length > 0 ? uRole : false;

        // gen token for storing on client
        let token = genToken(_id);

        return res.status(200).json({_id, username, email, active, role, avatar, token});
    } catch(err) {
        return next(err);
    }
}

exports.changePassword = async(req, res, next) => {
    try {
        let foundAccount = await db.User.findById(req.params.user_id);

        // Compare if the entered current pass is matched
        const {current, change} = req.body;
        let match = await foundAccount.comparePassword(current);
        if(!match) {
            return next({
                status: 500,
                message: "The current password entered is not matched. Please try again."
            })
        }
        foundAccount.password = change;
        await foundAccount.save();

        // Send mail for informing about changing password
        mail.changePassword(foundAccount.email, foundAccount.username);

        return res.status(200).json({success: true});
    } catch (e) {
        return next({
            status: 500,
            message: "There are some problems with the server. Please try again."
        });
    }
}
