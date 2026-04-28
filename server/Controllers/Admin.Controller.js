import User from "../Models/User.Model.js";
import SOSLog from "../Models/SOSLog.Model.js";

const GetDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSOS = await SOSLog.countDocuments();
    const recentSOS = await SOSLog.find()
      .sort({ triggeredAt: -1 })
      .limit(10)
      .populate("user", "username email");

    return res.status(200).json({ totalUsers, totalSOS, recentSOS });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("username email isAdmin createdAt contacts isGoogleUser")
      .sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({ message: "Cannot delete your own admin account" });
    }

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser: deletedUser.username
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { GetDashboardStats, GetAllUsers, DeleteUser };