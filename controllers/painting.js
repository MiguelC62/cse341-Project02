const db = require('../models');
const Painting = db.painting;

exports.getPainting = (req, res) => {
  const stylename = req.params.stylename;
  Painting.find({ stylename: stylename })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found theme with name: ' + stylename });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving theme with themeName=' + stylename,
        error: err
      });
    });
};

module.exports.getAllPaintings = (req, res) => {
  try {
   Painting.find({})
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

module.exports.createPainting = (req, res) => {
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
    const painting = new Painting(req.body);
   painting
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
