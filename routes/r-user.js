const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/login").post(hdl.User.logIn);
router.route("/signup").post(hdl.User.signUp);

router.route("/:user_id").get(hdl.User.getOne);
router.route("/:user_id/activate").put(hdl.User.activate);

router.use("/:user_id/providers", require("./r-provider"));
router.use("/:user_id/orders", require("./r-order"));
router.use("/:user_id/shipments", require("./r-shipment"));
router.use("/:user_id/messages", require("./r-message"));

module.exports = router;
