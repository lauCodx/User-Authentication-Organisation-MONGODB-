import express from "express";
import DbConnect from "./config/db.config";
import errorHandler from "./middlewares/errorHandler";
require("dotenv").config();
import userRoute from "./routers/user.route"
import singleUser from "./routers/singleUser.route"
import cors from "cors"
import bodyParser from "body-parser"

const app = express();
const port = Number(process.env.PORT || 5000);

DbConnect();
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use("/auth", userRoute )
app.use("/api/user", singleUser)


app.listen(port, () => {
  console.log("App listening on Port:", port);
});

app.use(errorHandler);

