const express = require('express');

const ProductsService = require('./../services/product.services');
const validatorHandler = require('./../middelware/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();


router.get("/", async (req, res) => {
  const products = await service.find()
  res.json(products);
});

router.get('/:id',
validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error)
    }
  }
);


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    //const {name, price, image} = req.body;
    const body = req.body;
    const mewProduct = await service.create(body);
    res.status(201).json(mewProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product);
  } catch (error) {
    next(error)
  }

})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await service.delete(id)
  res.json(product);
})

module.exports = router;
