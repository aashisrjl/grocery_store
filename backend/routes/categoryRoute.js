const express = require('express');

const { addCategory, getCategory, getSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const router = express.Router();

router.route("/category").get(getCategory).post(isAuthenticated,allowedTo('admin'),addCategory)
router.route("/category/:id").get(getSingleCategory).patch(isAuthenticated,allowedTo('admin'),updateCategory).delete(isAuthenticated,allowedTo('admin'),deleteCategory);


module.exports = router