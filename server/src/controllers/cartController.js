const db = require('../config/db');

const getOrCreateCart = async (userId) => {
  const [cartRows] = await db.query(
    'SELECT id FROM carts WHERE user_id = ? LIMIT 1',
    [userId]
  );

  if (cartRows.length > 0) {
    return cartRows[0].id;
  }

  const [result] = await db.query(
    'INSERT INTO carts (user_id) VALUES (?)',
    [userId]
  );

  return result.insertId;
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartId = await getOrCreateCart(userId);

    const [items] = await db.query(
      `
      SELECT
        ci.id AS cart_item_id,
        ci.quantity,
        ci.product_option_id,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        po.color,
        po.size,
        po.stock,
        (
          SELECT pi.image_url
          FROM product_images pi
          WHERE pi.product_id = p.id
          ORDER BY pi.id ASC
          LIMIT 1
        ) AS image_url
      FROM cart_items ci
      JOIN product_options po ON ci.product_option_id = po.id
      JOIN products p ON po.product_id = p.id
      WHERE ci.cart_id = ?
      ORDER BY ci.id DESC
      `,
      [cartId]
    );

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error('장바구니 조회 오류:', error);
    return res.status(500).json({
      success: false,
      message: '장바구니를 불러오는 중 오류가 발생했습니다.',
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_option_id, quantity } = req.body;

    if (!product_option_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'product_option_id와 quantity는 필수입니다.',
      });
    }

    if (Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: '수량은 1 이상이어야 합니다.',
      });
    }

    const cartId = await getOrCreateCart(userId);

    const [optionRows] = await db.query(
      `
      SELECT id, product_id, stock
      FROM product_options
      WHERE id = ?
      LIMIT 1
      `,
      [product_option_id]
    );

    if (optionRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '선택한 상품 옵션이 존재하지 않습니다.',
      });
    }

    const option = optionRows[0];

    if (option.stock < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: '재고가 부족합니다.',
      });
    }

    const [existingRows] = await db.query(
      `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = ? AND product_option_id = ?
      LIMIT 1
      `,
      [cartId, product_option_id]
    );

    if (existingRows.length > 0) {
      const existingItem = existingRows[0];
      const newQuantity = existingItem.quantity + Number(quantity);

      if (option.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: '재고보다 많은 수량을 담을 수 없습니다.',
        });
      }

      await db.query(
        `
        UPDATE cart_items
        SET quantity = ?
        WHERE id = ?
        `,
        [newQuantity, existingItem.id]
      );

      return res.status(200).json({
        success: true,
        message: '장바구니 수량이 변경되었습니다.',
      });
    }

    await db.query(
      `
      INSERT INTO cart_items (cart_id, product_id, product_option_id, quantity)
      VALUES (?, ?, ?, ?)
      `,
      [cartId, option.product_id, product_option_id, quantity]
    );

    return res.status(201).json({
      success: true,
      message: '장바구니에 상품이 추가되었습니다.',
    });
  } catch (error) {
    console.error('장바구니 추가 오류:', error);
    return res.status(500).json({
      success: false,
      message: '장바구니 추가 중 오류가 발생했습니다.',
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: '수량은 1 이상이어야 합니다.',
      });
    }

    const [rows] = await db.query(
      `
      SELECT
        ci.id,
        ci.cart_id,
        ci.product_option_id,
        c.user_id,
        po.stock
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      JOIN product_options po ON ci.product_option_id = po.id
      WHERE ci.id = ?
      LIMIT 1
      `,
      [cartItemId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '장바구니 상품을 찾을 수 없습니다.',
      });
    }

    const item = rows[0];

    if (item.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: '수정 권한이 없습니다.',
      });
    }

    if (item.stock < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: '재고보다 많은 수량으로 변경할 수 없습니다.',
      });
    }

    await db.query(
      `
      UPDATE cart_items
      SET quantity = ?
      WHERE id = ?
      `,
      [quantity, cartItemId]
    );

    return res.status(200).json({
      success: true,
      message: '장바구니 수량이 수정되었습니다.',
    });
  } catch (error) {
    console.error('장바구니 수정 오류:', error);
    return res.status(500).json({
      success: false,
      message: '장바구니 수정 중 오류가 발생했습니다.',
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        ci.id,
        c.user_id
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      WHERE ci.id = ?
      LIMIT 1
      `,
      [cartItemId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '장바구니 상품을 찾을 수 없습니다.',
      });
    }

    if (rows[0].user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: '삭제 권한이 없습니다.',
      });
    }

    await db.query('DELETE FROM cart_items WHERE id = ?', [cartItemId]);

    return res.status(200).json({
      success: true,
      message: '장바구니 상품이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('장바구니 삭제 오류:', error);
    return res.status(500).json({
      success: false,
      message: '장바구니 삭제 중 오류가 발생했습니다.',
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
};