const faker = require('faker');

const boom = require('@hapi/boom')


class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }


  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      isBlock: faker.datatype.boolean(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 2000);
    })
    //  return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if(product.isBlock) {
      throw boom.conflict('This product is block')
    }
    return product;
  }

  async update(id, body) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...body
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);

    return {
      id,
      message: 'Product deleted'
    }
  }


}

module.exports = ProductsService;
