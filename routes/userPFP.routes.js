const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const mongoose = require("mongoose");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLocaleLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + filename);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpeg and .jpeg is allowed"));
    }
  },
});

let User = require("../models/userModel");
router.post("/user-profile", upload.single("profileImg"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    utype: req.body.utype,
    profileImg: url + "/public" + req.file.filename,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "user registered successfully!",
        userCreated: {
          _id: result._id,
          profileImg: result.profileImg,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    res
      .status(200)
      .json({ msg: "user list retrieved successfully", users: data });
  });
});

module.exports = router;
