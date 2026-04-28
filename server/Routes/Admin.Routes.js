import express from "express";
import { GetDashboardStats, GetAllUsers, DeleteUser } from "../Controllers/Admin.Controller.js";
import { isAdmin } from "../Middlewares/admin.Middleware.js";

const router = express.Router();

// Admin routes - protected by admin middleware
router.get("/stats", isAdmin, GetDashboardStats);
router.get("/users", isAdmin, GetAllUsers);
router.delete("/delete-user", isAdmin, DeleteUser);

export default router;
