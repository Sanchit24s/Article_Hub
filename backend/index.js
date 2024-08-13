const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const appuserRoute = require("./routes/appuser");
const categoryRoute = require("./routes/category");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/appuser", appuserRoute);
app.use("/category", categoryRoute);
module.exports = app;