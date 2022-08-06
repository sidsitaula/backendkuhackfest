//necessary imports
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authentication");
const authMiddleware = require("./middlewares/auth.middleware");
const courseStream = require("./routes/courseStream");
const courseItem = require("./routes/courseItem");
const notFound = require("./middlewares/notFound");
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/userPFP.routes");

//creating server instance
const app = express();

//middlewares

app.use(express.json());
//app.use('/',authMiddleware)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/contact", (req, res) => {
  res.send("CONTACT PAGE");
});

//Routers
//app.use('/',authRoute)
app.use("/public", express.static("public"));
app.use("/api/v1/courseStream", courseStream);
app.use("/api/v1/courseStream/courseItem", courseItem);
app.use("/api/v1/user", user);
app.use(notFound);

//configuring env for environment variables
env.config();

//settingup mongodb atlas connection
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to mongoDB atlas");
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server started @PORT: ${process.env.PORT_NUMBER}`);
});
