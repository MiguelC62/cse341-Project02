const db = require('../models');
const Painting = db.painting;


exports.getPainting = (req, res) => {
  const stylename = req.params.stylename;
  Painting.find({ stylename: stylename })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found style with name: ' + stylename });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving style with stylename=' + stylename,
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
/*
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
          message: err.message || 'Some error occurred while creating the painting.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePainting = async (req, res) => {
  try {
    const title = req.params.title;
    if (!title) {
      return res.status(400).send({ message: 'Invalid Title Supplied' });
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      return res.status(400).send({ message: passwordCheck.error });
    }
    const painting = await Painting.findOne({ title: title });
    if (!painting) {
      return res.status(404).json({ error: 'Painting not found' });
    }

    painting.title = req.params.title;
    painting.stylename = req.body.stylename;
    painting.author_name = req.body.author_name;
    painting.painting_description = req.body.painting_description;
    painting.painting_data = req.body.painting_data;
    painting.painting_technic = req.body.painting_technic;
    painting.imageUrl = req.body.imageUrl;
    painting.price = req.body.price;
      
    const updatedPainting = await painting.save();

    // Respond with  status 204(whitout content)
    res.status(204).send();
    
    return res.json(updatedPainting);

  } catch (err) {
    res.status(500).json({message: 'server internal error'});
  }
};

module.exports.deletePainting = async (req, res) => {
  try {
    const title = req.params.title;
    if (!title) {
      return res.status(400).send({ message: 'Invalid Title Supplied' });
    }
    const result = await Painting.deleteOne({ title });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Painting no found' });
    }
    return res.json({ message: 'Painting removed correctly' });
  } catch (err) {
      return res.status(500).json({message: 'Some error occurred while deleting the painting.'});
  }
};
*/

