const { Router } = require('express');
var jwt = require('jsonwebtoken');

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
                const token = jwt.sign({ user: 'wtf' }, 'shhhhh');
                console.log(token)
                res.send({
                  code: 200,
                  message: 'OK',
                  data: {
                      user: {
                          username: user.username,
                          password: user.password,
                      }
                  },
                  token: token,
               });
            } else {
                res.send({
                  code: 404,
                  message: 'Not Found',
                  data: { error: 'Wrong password' }
              });
            }
        } else {
            res.send({
              code: 404,
              message: 'Not Found',
              data: { error: 'No such user' }
           });
        }
    });

    app.use('/auth', router);

    return app;
};