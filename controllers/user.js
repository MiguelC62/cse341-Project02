const db = require('../models');
const User = db.user;
const passwordUtil = require('../util/passwordComplexityCheck');

module.exports.createUser = (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports.getAllUsers = (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUser = (req, res) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      return res.status(400).send({ message: 'Invalid Username Supplied' });
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      return res.status(400).send({ message: passwordCheck.error });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = req.params.username;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.phonenumber = req.body.phonenumber;
    user.stylename = req.body.stylename;
    user.message = req.body.message;
      
    await user.save();
    // Respond with status 204 (without content)
    res.status(204).send();

  } catch (err) {
    res.status(500).json({message: 'server internal error'});
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      return res.status(400).send({ message: 'Invalid Username Supplied' });
    }
    const result = await User.deleteOne({ username });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
      return res.status(500).json({message: 'Some error occurred while deleting the contact.'});
  }
};