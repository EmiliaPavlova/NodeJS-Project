const jwt = require('jsonwebtoken');

const tokenVerificatingMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'verysecret');
    next();
}

export default tokenVerificatingMiddleware;
