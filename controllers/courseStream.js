//imports
const Stream = require("../models/streamModel");

//all streamss

const getAllStreams = async (req, res) => {
  try {
    const stream = await Stream.find({});
    res.status(200).json({ stream });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//CRUD functionality

const createStream = async (req, res) => {
  try {
    const stream = await Stream.create({
      sname: req.body.name,
    });
    res.status(201).json({ stream });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getStream = async (req, res) => {
  try {
    const { id: streamId } = req.params;
    const stream = await Stream.findOne({ _id: streamId });
    if (!stream) {
      return res.status(404).json({ msg: `no stream with Id: ${streamId} ` });
    }
    res.status(200).json({ stream });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  res.json({ id: req.params.id });
};

const updateStream = async (req, res) => {
  try {
    const { id: streamId } = req.params;
    const stream = await Stream.findOneAndUpdate({ _id: streamId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stream) {
      return res.status(404).json({ msg: "no stream with Id" });
    }
    res.status(200).json({ stream });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteStream = async (req, res) => {
  try {
    const { id: streamId } = req.params;
    const stream = await Stream.findOneAndDelete({ _id: streamId });
    if (!stream) {
      return res.status(404).json({ msg: `no stream with Id` });
    }
    res.status(200).send(); //delete bhanepaxi ta json pathai rakhnai parena hola ni 200 status dekhna sath bujha ni??
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllStreams,
  createStream,
  getStream,
  updateStream,
  deleteStream,
};
