import express from "express";
import DbConnect from "./config/db.config";
require("dotenv").config()

const app = express()
const port = Number (process.env.PORT  || 5000)

DbConnect()

app.listen(port, ()=>{
    console.log("App listening on Port", port)
})