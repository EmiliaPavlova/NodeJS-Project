const Product = require('../models').Product;
const Review = require('../models').Review;

module.exports = {
    createProduct(req, res) {
        return Product
            .create({
                name: req.body.name,
                price: req.body.price
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(400).send(error));
    },
    getAllProducts(req, res) {
        return Product
            .all()
            .then(products => res.status(200).send(products))
            .catch(error => res.status(400).send(error));
    },
    getProductById(req, res) {
        return Product
            .findById(req.params.productId)
            .then(product => {
                if (!product) {
                return res.status(404).send({
                    message: 'Product Not Found',
                });
                }
                return res.status(200).send(product);
            })
            .catch(error => res.status(400).send(error));
    },
    createReview(req, res) {
        return Review
            .create({
                content: req.body.content,
                productId: req.params.productId,
            })
            .then(review => res.status(201).send(review))
            .catch(error => res.status(400).send(error));
      },
      getAllReviewsByProduct(req, res) {
        return Product
            .findById(req.params.productId, {
                include: [{
                    model: Review,
                    as: 'reviews',
                }],
            })
            .then(product => {
                if (!product) {
                    return res.status(404).send({
                        message: 'Product Not Found',
                    });
                }
                return res.status(200).send(product);
            })
            .catch(error => res.status(400).send(error));
      }
};
