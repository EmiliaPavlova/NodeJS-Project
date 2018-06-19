const init = (data) => {
    const controller = {
        getAllProducts(req, res) {
            return res.send('getAllProducts');
        },
        addProduct(req, res) {
            return res.send('addProduct');
        },
        getProductById(req, res) {
            return res.send('getProductById: ' + req.params.id);
        },
        getProductByIdReviews(req, res) {
            return res.send('getProductByIdReviews: ' + req.params.id);
        },
    };
    return controller;
};

module.exports = {
    init,
};
