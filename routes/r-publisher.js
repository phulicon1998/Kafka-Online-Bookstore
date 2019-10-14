const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Publisher.get)
.post(hdl.Publisher.create);

router.route("/:publisher_id")
.delete(hdl.Publisher.remove)
.put(hdl.Publisher.edit);

module.exports = router;
