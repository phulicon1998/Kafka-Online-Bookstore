const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/all").get(hdl.Conversation.get);

router.route("/")
.get(hdl.Conversation.getOne)
.post(hdl.Conversation.create);

module.exports = router;
