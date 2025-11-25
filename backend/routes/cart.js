const express = require("express");
const router = express.Router();

// In-memory cart storage (in production, use database)
const carts = {};

// Get cart
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  res.json(carts[userId] || []);
});

// Add to cart
router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity, name, price, image } = req.body;

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity, name, price, image });
  }

  res.json(carts[userId]);
});

// Remove from cart
router.delete("/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);

  if (carts[userId]) {
    carts[userId] = carts[userId].filter(
      (item) => item.productId !== productId
    );
  }

  res.json(carts[userId] || []);
});

module.exports = router;
