import express from "express";
import { getAllOrg } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validation.token";

const route = express.Router();

route.get("/organisations", validateToken, getAllOrg)

export default route
