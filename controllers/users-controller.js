const init = (data) => {
    const controller = {
        getAllUsers(req, res) {
            return res.send('getAllUsers');
        },
    };
    return controller;
};

module.exports = {
    init,
};
