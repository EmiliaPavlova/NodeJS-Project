const { Router } = require('express');
const jwt = require('jsonwebtoken');

const admins = [{
    id: 1,
    username: 'admin',
    password: '123456',
}];

module.exports = (app) => {
    const router = new Router();

    router.post('/', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = admins.find(user => user.username === username);
        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ user: req.body.username }, 'verysecret');
                console.log(token)
                res.send({
                    user: {
                          username: user.username,
                          password: user.password,
                      },
                    token: token,
               });
            } else {
                res.status(404)
                    .send('Wrong password');
            }
        } else {
            res.status(404)
                .send('No such user');
        }
    });

    app.use('/auth', router);

    return app;
};