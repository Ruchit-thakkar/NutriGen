const Profile = require("../models/profile.model");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    // Look for the profile belonging to the logged-in user
    // (Assuming authMiddleware attaches user to req.user)
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please update your profile.",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// UPDATE (OR CREATE) PROFILE
// UPDATE (OR CREATE) PROFILE
exports.updateProfile = async (req, res) => {
  try {
    // 🟢 FIX 1: Bulletproof ID extraction
    const userId = req.user.id || req.user._id || req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication error: User ID not found.",
      });
    }

    const updateData = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true, // 🟢 FIX 2: Crucial for complex nested upserts
      },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      // Send the actual Mongoose error message to the frontend so you can see what failed
      message: error.message || "Server error while updating profile",
    });
  }
};
