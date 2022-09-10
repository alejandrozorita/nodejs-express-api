const faker = require('faker');

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
      })
    }
  }

  async create(data) {
    const newProduct = {
      if: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    })
    //  return this.products;
  }

  async findOne(id) {
    return this.products.find(item => item.id === id);
  }

  async update(id, body) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);

    return {
      id,
      message: 'Product deleted'
    }
  }


}

module.exports = ProductsService;
