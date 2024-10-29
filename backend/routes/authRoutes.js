import express from "express";
import authcontroller from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", authcontroller.signup);

router.post("/login", authcontroller.login);

router.post("/logout", authcontroller.logout);


export default router;
