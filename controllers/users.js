const User = require('../models').User;

module.exports = {
    getAllUsers(req, res) {
        return User
            .all()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    }
};
