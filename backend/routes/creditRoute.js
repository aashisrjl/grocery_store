const express = require('express');
const router = express.Router();

router.route("/credit").post()
router.route("/credit-req/:id").post()
router.route("/credit-handle/:id").post()
router.route("/credit/:id").delete()

module.exports = router;