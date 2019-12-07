const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middlewares");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Edition.get)
.post(upload.fields([{name: "images"}]), mw.Image.get, mw.Provider.getId, hdl.Edition.create);

router.route("/cart").post(hdl.Edition.getInCart);

router.route("/:edition_id")
.get(hdl.Edition.getOne)
.put(upload.fields([{name: "images"}]), mw.Image.get, hdl.Edition.edit);

router.route("/:edition_id/compare")
.post(hdl.Edition.compare);

router.use("/:edition_id/reviews", require("./r-review"));

router.route("/:edition_id/stop").put(hdl.Edition.stop);

module.exports = router;
