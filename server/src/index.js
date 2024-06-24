require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./models");
const Position = require("./models/position");
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/", require("./routes"));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database: " + err);
  });
