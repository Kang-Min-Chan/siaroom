const pool = require('../config/db');

const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.price,
        p.sale_price,
        p.thumbnail_url,
        p.is_sale
      FROM products p
      WHERE p.is_visible = TRUE
      ORDER BY p.created_at DESC
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await pool.query(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );

    const [options] = await pool.query(
      `SELECT * FROM product_options WHERE product_id = ?`,
      [id]
    );

    const [images] = await pool.query(
      `SELECT * FROM product_images WHERE product_id = ?`,
      [id]
    );

    res.json({
      success: true,
      data: {
        product: product[0],
        options,
        images
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

<<<<<<< HEAD
=======


>>>>>>> 4124635 (3월20일 1차)
module.exports = {
  getProducts,
  getProductDetail
};