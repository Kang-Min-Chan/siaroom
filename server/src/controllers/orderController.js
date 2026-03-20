const db = require("../config/db");


// 1) 주문 생성
exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  const {
    recipient_name,
    recipient_phone,
    postcode,
    address,
    detail_address,
    request_message,
  } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. 사용자의 장바구니 항목 조회
   const [cartItems] = await connection.query(
    `
    SELECT
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        po.id AS product_option_id,
        po.color,
        po.size
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    JOIN product_options po ON ci.product_option_id = po.id
    JOIN products p ON po.product_id = p.id
    WHERE c.user_id = ?
    ORDER BY ci.id ASC
    `,
    [userId]
    );

    if (cartItems.length === 0) {
      await connection.rollback();
      return res.status(400).json({
        message: "장바구니가 비어 있습니다.",
      });
    }

    // 2. 총 금액 계산
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    // 3. orders 테이블에 주문 생성
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (
        user_id,
        total_amount,
        status,
        recipient_name,
        recipient_phone,
        postcode,
        address,
        detail_address,
        request_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        totalAmount,
        "paid",
        recipient_name,
        recipient_phone,
        postcode,
        address,
        detail_address,
        request_message || null,
      ]
    );

    const orderId = orderResult.insertId;

    // 4. order_items에 장바구니 항목 snapshot 저장
    for (const item of cartItems) {
      const subtotal = Number(item.price) * Number(item.quantity);

      await connection.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_option_id,
          product_name,
          option_color,
          option_size,
          price,
          quantity,
          subtotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.product_option_id,
          item.product_name,
          item.color,
          item.size,
          item.price,
          item.quantity,
          subtotal,
        ]
      );
    }

    // 5. 주문 완료 후 장바구니 비우기
    await connection.query(
    `
    DELETE ci
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    WHERE c.user_id = ?
    `,
    [userId]
    );

    await connection.commit();

    return res.status(201).json({
      message: "주문이 완료되었습니다.",
      orderId,
      totalAmount,
    });
  } catch (error) {
    await connection.rollback();
    console.error("createOrder error:", error);
    return res.status(500).json({
      message: "주문 생성 중 오류가 발생했습니다.",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};


// 2) 내 주문 목록 조회
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const [orders] = await db.query(
      `
      SELECT
        o.id,
        o.total_amount,
        o.status,
        o.recipient_name,
        o.recipient_phone,
        o.address,
        o.detail_address,
        o.postcode,
        o.request_message,
        o.created_at
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC, o.id DESC
      `,
      [userId]
    );

    return res.status(200).json(orders);
  } catch (error) {
    console.error("getMyOrders error:", error);
    return res.status(500).json({
      message: "주문 목록 조회 중 오류가 발생했습니다.",
      error: error.message,
    });
  }
};


// 3) 내 주문 상세 조회
exports.getMyOrderDetail = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  try {
    // 주문 기본 정보
    const [orders] = await db.query(
      `
      SELECT
        o.id,
        o.user_id,
        o.total_amount,
        o.status,
        o.recipient_name,
        o.recipient_phone,
        o.address,
        o.detail_address,
        o.postcode,
        o.request_message,
        o.created_at
      FROM orders o
      WHERE o.id = ? AND o.user_id = ?
      `,
      [orderId, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        message: "주문 정보를 찾을 수 없습니다.",
      });
    }

    // 주문 상품 목록
    const [items] = await db.query(
      `
      SELECT
        oi.id,
        oi.order_id,
        oi.product_id,
        oi.product_option_id,
        oi.product_name,
        oi.option_color,
        oi.option_size,
        oi.price,
        oi.quantity,
        oi.subtotal
      FROM order_items oi
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC
      `,
      [orderId]
    );

    return res.status(200).json({
      order: orders[0],
      items,
    });
  } catch (error) {
    console.error("getMyOrderDetail error:", error);
    return res.status(500).json({
      message: "주문 상세 조회 중 오류가 발생했습니다.",
      error: error.message,
    });
  }
};