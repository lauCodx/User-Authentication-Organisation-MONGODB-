import express from "express";
import DbConnect from "./config/db.config";
import errorHandler from "./middlewares/errorHandler";
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 5000);

DbConnect();
app.use(express.json())
app.use(errorHandler);
app.listen(port, () => {
  console.log("App listening on Port:", port);
});


