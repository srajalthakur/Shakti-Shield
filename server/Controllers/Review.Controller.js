
import User from "../Models/User.Model.js";

const AddReview = async (req, res) => {
    const userId = req.user?.id;
    const { location, title, review, rating } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!location || !title || !review) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    reviews: { user: userId, location, title, review, rating: rating || 5 }
                }
            },
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newReview = updatedUser.reviews[updatedUser.reviews.length - 1];

        res.status(201).json({
            message: "Review Added Succesfully",
            review: newReview,
            user:{
               username : updatedUser.username,
               photo : updatedUser.profilePhoto
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Error occured", error })
    }


}

const GetAllReviews = async (req, res) => {
    try {
        
        const users = await User.find({}, 'reviews username');

        const allReviews = users.flatMap(user =>
            user.reviews.map(review => ({
                ...review.toObject(),
                user: {
                    _id: user._id,
                    username: user.username
                }
            }))
        );

        res.status(200).json({
            message: "All reviews fetched successfully",
            reviews: allReviews
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in getting reviews",
            error: error.message
        });
    }
};

const DeleteReview = async (req, res) => {
  const userId = req.user?.id;
  const { reviewId } = req.query;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!reviewId) return res.status(400).json({ message: "Review ID required" });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting review", error });
  }
};

export { AddReview, GetAllReviews, DeleteReview }