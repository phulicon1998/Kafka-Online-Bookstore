const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middlewares");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Book.get)
.post(upload.single("image"), mw.Image.getOne, hdl.Book.create);

router.route("/report")
.get(hdl.Book.report);

router.route("/store")
.get(hdl.Book.getForStore);

router.route("/:book_id")
.get(hdl.Book.getOne)
.put(upload.single("image"), mw.Image.getOne, hdl.Book.edit);

router.route("/:book_id/review").put(hdl.Book.review);

module.exports = router;
