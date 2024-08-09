import express from "express";
import { validateToken } from "../middlewares/validation.token";
import { addUserToOrg, getAllOrg, getOrgById } from "../controllers/org.controller";

const route = express.Router();

route.use(validateToken)
route.get("/", getAllOrg)
route.get("/:orgId", getOrgById)
route.post("/:orgId/users", addUserToOrg)

export default route
