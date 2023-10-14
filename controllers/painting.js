const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPaintings = async (req, res) => {
  const result = await mongodb.getDb().db().collection('painting').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPainting = async (req, res) => {
  const stylename = req.params.stylename;
  const result = await mongodb.getDb().db().collection('painting').find({"stylename":stylename });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createPainting = async (req, res) => {
  const contact = {
    painting_name: req.body.painting_name,
    stylename: req.body.stylename,
    author_name: req.body.author_name,
    painting_description: req.body.painting_description,
    painting_data: req.body.painting_data,
    painting_technic: req.body.painting_technic,
  };
  const response = await mongodb.getDb().db().collection('painting').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};
module.exports = {
  getAllPaintings,
  getPainting,
  createPainting,
};
