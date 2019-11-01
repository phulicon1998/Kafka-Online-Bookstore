const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Conversation.get)
.post(hdl.Conversation.create);

module.exports = router;
