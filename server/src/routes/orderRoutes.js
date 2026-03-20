const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// 주문 생성
router.post("/", authMiddleware, orderController.createOrder);

// 내 주문 목록 조회
router.get("/", authMiddleware, orderController.getMyOrders);

// 내 주문 상세 조회
router.get("/:id", authMiddleware, orderController.getMyOrderDetail);

module.exports = router;