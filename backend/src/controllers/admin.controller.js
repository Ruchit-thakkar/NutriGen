const User = require("../models/user.model"); // Adjust path if needed

exports.getOverviewData = async (req, res) => {
  try {
    // 1. Basic Stats
    const totalUsers = await User.countDocuments();

    // Active users (Mocked as users who have completed their profile, or you can use a lastLogin field if you have one)
    const activeUsers = await User.countDocuments({ profileCompleted: true });

    // 2. Date Setup for Graphs
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 3. Helper function for Daily Aggregation (7D and 30D)
    const getDailyRegistrations = async (startDate) => {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      // Map to frontend-friendly format
      return data.map((d) => ({ name: d._id.substring(5), users: d.count })); // Returns MM-DD
    };

    // 4. Helper function for Monthly Aggregation (Lifetime)
    const getLifetimeRegistrations = async () => {
      const data = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      return data.map((d) => ({ name: d._id, users: d.count })); // Returns YYYY-MM
    };

    // Fetch all graph data
    const last7Days = await getDailyRegistrations(sevenDaysAgo);
    const last30Days = await getDailyRegistrations(thirtyDaysAgo);
    const lifetime = await getLifetimeRegistrations();

    // 5. Recent Activity (Latest 4 users)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(4);
    const recentActivity = recentUsers.map((u) => ({
      id: u._id,
      type: "registration",
      user: u.email,
      time: u.createdAt,
    }));

    // Send Response
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeToday: activeUsers,
        pendingTickets: 0, // Placeholder for support logic
        recentActivity,
      },
      graphs: {
        sevenDays: last7Days.length
          ? last7Days
          : [{ name: "No Data", users: 0 }],
        thirtyDays: last30Days.length
          ? last30Days
          : [{ name: "No Data", users: 0 }],
        lifetime: lifetime.length ? lifetime : [{ name: "No Data", users: 0 }],
      },
    });
  } catch (error) {
    console.error("Admin Overview Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ... (keep your existing getOverviewData function here) ...

// 🟢 Fetch all users and calculate directory stats
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");

    const total = users.length;

    // 👇 NEW LOGIC: Calculate active users in the last 48 hours
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const active = users.filter(
      (user) => user.updatedAt >= fortyEightHoursAgo,
    ).length;

    // Format the data to make it easy for the frontend to consume
    const formattedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.fullName?.firstName || "Unknown",
      lastName: user.fullName?.lastName || "Unknown",
      email: user.email,
      role: user.role,
      joined: user.createdAt,
      active: user.updatedAt >= fortyEightHoursAgo, // Optional boolean if you want to show a green dot on active users
    }));

    res.status(200).json({
      success: true,
      stats: { total, active },
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};
// 🟢 Delete a user securely
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user first to check their role
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Security check: Prevent admins from deleting other admins
    if (userToDelete.role === "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Cannot delete an admin account." });
    }

    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "User successfully deleted." });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete user." });
  }
};
// 🟢 Fetch all users and calculate directory stats
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");

    const total = users.length;

    // 👇 NEW LOGIC: Calculate active users in the last 48 hours
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const active = users.filter(
      (user) => user.updatedAt >= fortyEightHoursAgo,
    ).length;

    // Format the data to make it easy for the frontend to consume
    const formattedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.fullName?.firstName || "Unknown",
      lastName: user.fullName?.lastName || "Unknown",
      email: user.email,
      role: user.role,
      joined: user.createdAt,
      active: user.updatedAt >= fortyEightHoursAgo, // Optional boolean if you want to show a green dot on active users
    }));

    res.status(200).json({
      success: true,
      stats: { total, active },
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};
// 🟢 Fetch detailed graph data for registrations
exports.getGraphData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Helper: Daily Aggregation
    const getDailyRegistrations = async (startDate) => {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%m-%d", date: "$createdAt" } }, // Format as MM-DD
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      return data.map((d) => ({ name: d._id, users: d.count }));
    };

    // Helper: Monthly Aggregation (Lifetime)
    const getLifetimeRegistrations = async () => {
      const data = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Format as YYYY-MM
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      return data.map((d) => ({ name: d._id, users: d.count }));
    };

    // Fetch the data
    const sevenDays = await getDailyRegistrations(sevenDaysAgo);
    const thirtyDays = await getDailyRegistrations(thirtyDaysAgo);
    const lifetime = await getLifetimeRegistrations();

    res.status(200).json({
      success: true,
      totalUsers,
      graphs: {
        sevenDays: sevenDays.length
          ? sevenDays
          : [{ name: "No Data", users: 0 }],
        thirtyDays: thirtyDays.length
          ? thirtyDays
          : [{ name: "No Data", users: 0 }],
        lifetime: lifetime.length ? lifetime : [{ name: "No Data", users: 0 }],
      },
    });
  } catch (error) {
    console.error("Graph Data Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch graph data." });
  }
};
