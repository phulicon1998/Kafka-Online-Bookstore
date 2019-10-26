const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Order.get)
.post(hdl.Order.create);

router.route("/:order_id").get(hdl.Order.getOne);

module.exports = router;
