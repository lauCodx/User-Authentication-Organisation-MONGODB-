import express from "express";
import { getUser } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validation.token";

const route = express.Router();

export default route.get("/:id",validateToken, getUser)