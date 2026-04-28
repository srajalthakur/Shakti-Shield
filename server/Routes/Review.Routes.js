import express from "express"
import { AddReview, GetAllReviews, DeleteReview } from "../Controllers/Review.Controller.js"
import { Authenticated } from "../Middlewares/auth.Middleware.js"

const router = express.Router()

router.post("/addreview", Authenticated, AddReview)
router.get("/allreviews", GetAllReviews)
router.delete("/delete", Authenticated, DeleteReview)

export default router