const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Genre.get)
.post(hdl.Genre.create);

router.route("/:genre_id")
.delete(hdl.Genre.remove)
.put(hdl.Genre.edit);

module.exports = router;
