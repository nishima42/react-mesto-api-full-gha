require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(`there is a user ${user}`);
      const token = jwt.sign(
        { _id: user.id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' }
      );
      console.log(token);
      res
        .cookie('jwt', token, {
          maxAge: 86400 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};
