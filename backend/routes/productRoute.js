const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { upload } = require('../middleware/multerConfig');
const { addProduct, getAllProduct } = require('../controllers/productControler');
const { errorHandler } = require('../services/catchAsyncError');

router.route("/product").post(isAuthenticated,allowedTo('admin'),upload.single('image'),addProduct).get(errorHandler(getAllProduct))
router.route("/product/:id").patch().delete();

module.exports = router;
