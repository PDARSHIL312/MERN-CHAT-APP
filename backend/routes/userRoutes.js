import express from "express";
import protecteRoute from "../middleware/protectRoute.js";

import {getUsersForSideBar} from "../controllers/user.Controller.js";

const router = express.Router();

router.get("/", protecteRoute, getUsersForSideBar);

export default router;
