const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middlewares");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Edition.get)
.post(upload.any("images"), mw.Image.get, hdl.Edition.create);

module.exports = router;
