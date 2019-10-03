const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Genre.get)
.post(hdl.Genre.create);

module.exports = router;
