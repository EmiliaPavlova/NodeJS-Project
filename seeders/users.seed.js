import User from '../models';

User.find({}).removeAsync()
  .then(() => {
    User.create({
      name: "Mickey Mouse"
    },
    {
      name: "Harry Potter"
    },
    {
      name: "John Doe"
    })
  });
