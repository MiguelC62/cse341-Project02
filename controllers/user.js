const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getUser = async (req, res) => {
  const stylename = req.params.stylename;
  const result = await mongodb.getDb().db().collection('user').find({ "stylename": stylename });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createUser = async (req, res) => {
  const contact = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    stylename: req.body.stylename,
    message: req.body.message,
  };
  const response = await mongodb.getDb().db().collection('user').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    stylename: req.body.stylename,
    message: req.body.message,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });

  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
