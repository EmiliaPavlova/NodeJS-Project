import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const admins = [{
    id: 1,
    username: 'admin',
    password: '123456',
}];

module.exports = (app) => {
    const router = new Router();

    router
        .post('/auth', (req, res) => {
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
        })
        .post('/login',
            passport.authenticate('local'),
            (req, res) => res.json(req.user))
        .get('/auth/facebook',
            passport.authenticate('facebook'))
        .get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/login' }),
            (req, res) => {
              // Successful authentication, redirect home.
              res.redirect('/');
            });

    app.use('/', router);

    return app;
};