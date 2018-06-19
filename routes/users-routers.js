const users = [{
    id: 1,
    name: 'Emi',
},
{
    id: 2,
    name: 'Nadeto',
}];

module.exports = (app) => {
    app.get('/api/users',(req, res) => {
        res.send(users);
    });

    return app;
};