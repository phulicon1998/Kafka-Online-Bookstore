const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Shipment.get)
.post(hdl.Shipment.create);

router.route("/:shipment_id").delete(hdl.Shipment.remove);

module.exports = router;
