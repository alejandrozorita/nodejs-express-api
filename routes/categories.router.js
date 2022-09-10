const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId: categoryId,
    productId: productId,
    name: 'producto1',
    price: 1000

  });
})

module.exports = router;
