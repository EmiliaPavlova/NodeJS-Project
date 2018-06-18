var queryStringParserMiddleware = (req, res, next) => {
    const parsedQuery = {};

    const queryIndex = req.url.lastIndexOf('?');
    if (queryIndex > 0) {
        const queryString = req.url.substring(queryIndex + 1);
        queryString.split('&').forEach((pair) => {
            const [key, value] = pair.split('=');
            parsedQuery[key] = value;
        });
    }

    req.parsedQuery = parsedQuery;
    next()
}

export default queryStringParserMiddleware;