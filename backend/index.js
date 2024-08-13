const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const appuserRoute = require("./routes/appuser");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/appuser", appuserRoute);
module.exports = app;