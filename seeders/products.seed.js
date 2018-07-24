import Product from '../models';

Product.find({}).removeAsync()
  .then(() => {
    Product.create({
      name: "Product 1",
      price: 10.50
    },
    {
      name: "Product 2",
      price: 7.49
    },
    {
      name: "Product 3",
      price: 5.20
    })
  });

