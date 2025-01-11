const express = require('express');

const { addCategory, getCategory, getSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();

router.route("/category").get(getCategory).post(isAuthenticated,addCategory)
router.route("/category/:id").get(getSingleCategory).patch(isAuthenticated,updateCategory).delete(isAuthenticated,deleteCategory)


module.exports = router