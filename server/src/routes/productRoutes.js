const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======

>>>>>>> 4124635 (3월20일 1차)
const {
  getProducts,
  getProductDetail
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductDetail);

module.exports = router;