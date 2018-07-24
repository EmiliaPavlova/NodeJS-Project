import { Router } from 'express';
import { User } from '../models';

module.exports = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => User.find((err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users)
        }));

    app.use('/api/users', router);

  return app;
};