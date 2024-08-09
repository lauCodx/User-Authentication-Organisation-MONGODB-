import express from "express"
import { checkAuth, loginUser, registerUser } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validation.token";

const route = express.Router();

route.post("/register",registerUser )
route.post("/login", loginUser)
route.get("/", validateToken, checkAuth)



export default route