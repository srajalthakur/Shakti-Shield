/**
 * ==========================================
 * Shakti Shield — Express Server
 * ==========================================
 * 
 * REST APIs for:
 *  - User auth (/api/user)
 *  - Emergency contacts (/api/contacts)
 *  - Reviews (/api/reviews)
 *  - Profile (/api/profile)
 * 
 * Features:
 *  - Env config via dotenv
 *  - CORS with credentials + restricted origins
 *  - Cookie & body parsing
 *  - Central error handler
 *  - Production static frontend serving
 * 
 * ===================
 * © 2025 Aryan Shukla
 */

import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import AuthRoutes from "./Routes/Auth.js";
import UserRoutes from "./Routes/User.Routes.js";
import ContactRoutes from "./Routes/Contacts.Routes.js";
import ReviewRoutes from "./Routes/Review.Routes.js";
import ProfileRoutes from "./Routes/Profile.Routes.js";
import ConnectDb from "./config/db.js";
import SOSLogRoutes from "./Routes/SOSLog.Routes.js";
import AdminRoutes from "./Routes/Admin.Routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = __dirname + '/.env';

console.log("DEBUG: __dirname =", __dirname);
console.log("DEBUG: envPath =", envPath);
console.log("DEBUG: .env exists?", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });
console.log("DEBUG: dotenv result =", result.error || "success");
console.log("DEBUG: GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);

// Now import passport config after dotenv is loaded
await import("./config/passport.js");


const app = express();
const _dirname = path.resolve();

// ✅ CORS CONFIG
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://shakti-shield.vercel.app"]
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed from this origin: " + origin), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Body + cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session + Passport
app.use(
  session({
    secret: process.env.JWT_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/user", UserRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/auth", AuthRoutes);
app.use('/api/soslogs', SOSLogRoutes);
app.use("/api/admin", AdminRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Shakti Shield API is running.");
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ✅ Start server (connect DB first)
const PORT = process.env.PORT || 5000;
const started = await ConnectDb();
if (!started) {
  console.error("\nFix: start MongoDB locally or put a valid MONGO_URI in server/.env\n");
}
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
