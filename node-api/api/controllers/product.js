function getProducts(req, res) {
  const id = req.swagger.params.userId;
  const name = req.swagger.params.name.value || 'Bugs Bunny';
  const getProducts = {
    '_id': id,
    'name': name
  }
  res.json(getProducts);
}

function addProduct(req, res) {
  const name = req.swagger.params.name.value || 'Product';
  const price = req.swagger.params.price.value || 0.00;
  res.json(addProduct);
}

function getProductById(req, res) {
  res.send('Added');
}

function deleteProduct(req, res) {
  const id = req.swagger.params.productId;
  const name = req.swagger.params.name.value;

  res.send('Deleted');
}

function getProductReviews(req, res) {}

module.exports = {
  getProducts: getProducts,
  addProduct: addProduct,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
  getProductReviews: getProductReviews
};
