const express = require("express");
const router = express.Router();

const {
  getAllStreams,
  createStream,
  getStream,
  updateStream,
  deleteStream,
} = require("../controllers/courseStream");

router.route("/").get(getAllStreams).post(createStream);
router.route("/:id").get(getStream).patch(updateStream).delete(deleteStream);

module.exports = router;
