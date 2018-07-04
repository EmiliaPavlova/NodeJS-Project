import { Router } from 'express';

const users = [{
    id: 1,
    name: 'Emi',
},
{
    id: 2,
    name: 'Nadeto',
}];

module.exports = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        res.send(users);
    });

    app.use('/api/users', router);

    return app;
};