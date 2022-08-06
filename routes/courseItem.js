const express = require("express");
const router = express.Router();

const {
  getAllItem,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/courseItem");

router.route("/").get(getAllItem).post(createItem);
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);

module.exports = router;
