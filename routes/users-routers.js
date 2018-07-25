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
        }))
        .delete('/:userId', (req, res) => {
            const id = req.params.userId;
            User.find({_id: id})
              .remove((err) => {
                if (err) {
                  res.send(err);
                }
              res.json({ message: 'User deleted!' });
            });
        });

    app.use('/api/users', router);
    app.use('/api/users/:userId', router);

  return app;
};