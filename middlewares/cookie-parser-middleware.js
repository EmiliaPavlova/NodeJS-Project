const cookieParserMiddleware = (req, res, next) => {
    const parsedCookies = {};

    const cookie = req.headers.cookie;
    if (cookie) {
        cookie.split(';').forEach((pair) => {
            const [key, value] = pair.split('=');
            parsedCookies[key] = value;
        })
    }

    req.parsedCookies = parsedCookies;
    next();
}

export default cookieParserMiddleware;

// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server