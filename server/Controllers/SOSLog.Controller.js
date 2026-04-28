import SOSLog from "../Models/SOSLog.Model.js";

const AddSOSLog = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { location, contactsAlerted, status } = req.body;

    const log = await SOSLog.create({
      user: userId,
      location,
      contactsAlerted,
      status
    });

    return res.status(201).json({ message: "Log saved", log });
  } catch (error) {
    console.error("Error saving SOS log:", error);
    return res.status(500).json({ message: "Failed to save log" });
  }
};

const GetSOSLogs = async (req, res) => {
  try {
    const userId = req.user?.id;
    const logs = await SOSLog.find({ user: userId }).sort({ triggeredAt: -1 });
    return res.status(200).json({ logs });
  } catch (error) {
    console.error("Error fetching SOS logs:", error);
    return res.status(500).json({ message: "Failed to fetch logs" });
  }
};

export { AddSOSLog, GetSOSLogs };