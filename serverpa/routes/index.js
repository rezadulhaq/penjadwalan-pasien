const express = require("express");
const router = express.Router();
const user = require("./user");
const { authentication } = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");

router.use("/user", user);
// router.use(authentication);
// router.use("/user/profile", profile)
router.use(errorHandler);
module.exports = router;
