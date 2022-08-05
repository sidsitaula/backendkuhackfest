const Item = require("../models/courseItem");

const getAllItem = async (req, res) => {
  try {
    const item = await Item.find({});
    res.status(200).json({ item });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      cname: req.body.name,
      courseContent: req.body.courseContent,
      tag: req.body.tag,
    });
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await Item.findOne({ _id: itemId });
    if (!item) {
      return res.status(404).json({ msg: "no item with the given id" });
    }
    res.status(200).json({ item });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
  res.json({ id: req.params.id });
};

const updateItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await Item.findByIdAndUpdate({ _id: itemId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ msg: "no item with such id" });
    }
    res.status(200).json({ item });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await item.findOneAndDelete({ _id: itemId });
    if (!item) {
      return res.status(404).json({ msg: `no item with Id` });
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllItem,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
