const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Provider.get)
.post(hdl.Provider.create);

router.route("/:provider_id").delete(hdl.Provider.remove);

module.exports = router;
