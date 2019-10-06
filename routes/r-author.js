const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Author.get)
.post(hdl.Author.create);

router.route("/:author_id")
.delete(hdl.Author.remove)
.put(hdl.Author.edit);

module.exports = router;
