import mongoose from "mongoose";

const SOSLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  triggeredAt: {
    type: Date,
    default: Date.now
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  contactsAlerted: [String],
  status: {
    type: String,
    enum: ["success", "partial", "failed"],
    default: "success"
  }
});

export default mongoose.model("SOSLog", SOSLogSchema);