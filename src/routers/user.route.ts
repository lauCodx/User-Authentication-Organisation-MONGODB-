import express from "express"
import { registerUser } from "../controllers/user.controller";

const route = express.Router();

route.post("/register",registerUser )



export default route