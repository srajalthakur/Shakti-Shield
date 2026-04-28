import express from "express";
import { AddSOSLog, GetSOSLogs } from "../Controllers/SOSLog.Controller.js";
import { Authenticated } from "../Middlewares/auth.Middleware.js";

const router = express.Router();

router.post("/add", Authenticated, AddSOSLog);
router.get("/get", Authenticated, GetSOSLogs);

export default router;