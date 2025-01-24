import User from "../models/user.model.js";

export const getPoints = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getPoints in user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePoints = async (req, res) => {
  const { id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $inc: { GreenPoints: 10 } },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updatePoints in user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({}).sort({ GreenPoints: -1 }).select("-password");
    res.status(200).json(leaderboard);
  } catch (error) {
    console.log("Error in getLeaderboard in user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}