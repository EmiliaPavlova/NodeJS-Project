function getUsers(req, res) {
  console.log(req.swagger.params)
  const id = req.swagger.params.userId;
  const name = req.swagger.params.name.value || 'Bugs Bunny';
  const getUsers = {
    '_id': id,
    'name': name
  }

  res.json(getUsers);
}

function deleteUser(req, res) {
  const id = req.swagger.params.userId;
  const name = req.swagger.params.name.value;

  res.send('Deleted');
}

module.exports = {
  getUsers: getUsers,
  deleteUser: deleteUser
};
