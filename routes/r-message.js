const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Order.get)
.post(hdl.Order.create);

module.exports = router;
