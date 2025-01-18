const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { upload } = require('../middleware/multerConfig');
const { addProduct, getAllProduct, getSingleProduct, deleteProduct, updateProduct, getProductByCategory, getProductsByName, getProductByCategoryName, getProductByRating, getProductByDesc } = require('../controllers/productController');
const { errorHandler } = require('../services/catchAsyncError');

router.route("/product")
.post(isAuthenticated,allowedTo('admin'),upload.single('image'),errorHandler(addProduct))
.get(errorHandler(getAllProduct))

router.route("/product/:id")
.get(errorHandler(getSingleProduct))
.patch(isAuthenticated,allowedTo('admin'),upload.single('image'),errorHandler(updateProduct))
.delete(isAuthenticated,allowedTo('admin'),errorHandler(deleteProduct));

router.route("/product/:categoryId")
.get(errorHandler(getProductByCategory))

router.route("/product/:categoryName")
.get(errorHandler(getProductByCategoryName))

router.route("/product/:name")
.get(errorHandler(getProductsByName))

router.route("/product/:rating")
.get(errorHandler(getProductByRating))

router.route("/product/:desc")
.get(errorHandler(getProductByDesc))

module.exports = router;
