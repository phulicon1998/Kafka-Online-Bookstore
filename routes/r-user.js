const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middlewares");

router.route("/").get(hdl.User.get);

router.route("/login").post(hdl.User.logIn);
router.route("/social").post(mw.User.genPassword, hdl.User.social);
router.route("/signup").post(hdl.User.signUp);
router.route("/generate").post(mw.User.genPassword, hdl.User.generate);

router.route("/:user_id").get(hdl.User.getOne);
router.route("/:user_id/requests").get(hdl.Book.getRequest);
router.route("/:user_id/activate").put(hdl.User.activate);
router.route("/:user_id/password").post(hdl.User.changePassword);

router.use("/:user_id/providers", require("./r-provider"));
router.use("/:user_id/orders", require("./r-order"));
router.use("/:user_id/shipments", require("./r-shipment"));
router.use("/:user_id/messages", require("./r-message"));

module.exports = router;
