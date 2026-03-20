const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
} = require('../controllers/cartController');

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.put('/:cartItemId', authMiddleware, updateCartItem);
router.delete('/:cartItemId', authMiddleware, deleteCartItem);

module.exports = router;