import React, { useState, useEffect } from "react";
import {
  Users,
  Activity,
  Search,
  Trash2,
  Mail,
  Calendar,
  Shield,
  Loader2,
  Filter, // Added Filter icon
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../utils/api";

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  // 🟢 NEW: Added filter state
  const [activeFilter, setActiveFilter] = useState("all");

  // 1. Fetch real data from your backend
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const { data } = await api.get("/api/admin/users");
        if (data.success) {
          setUsers(data.users);
          setStats(data.stats);
        }
      } catch (error) {
        toast.error("Failed to load user directory.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  // 2. Hit the real delete endpoint
  const handleDeleteUser = async (userId, userName) => {
    if (
      window.confirm(`Are you sure you want to permanently delete ${userName}?`)
    ) {
      try {
        const { data } = await api.delete(`/api/admin/users/${userId}`);
        if (data.success) {
          // Remove user from local state so UI updates instantly
          setUsers(users.filter((user) => user.id !== userId));
          // Update the stats count
          setStats((prev) => ({ ...prev, total: prev.total - 1 }));
          toast.success(`${userName} has been removed.`);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user.");
      }
    }
  };

  // 🟢 3. Frontend Search & Filter Logic
  const filteredUsers = users.filter((user) => {
    // A. Search Match
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // B. Filter Match
    let matchesFilter = true;
    if (activeFilter === "admin") matchesFilter = user.role === "admin";
    if (activeFilter === "user") matchesFilter = user.role === "user";
    if (activeFilter === "recent") matchesFilter = user.active === true; // Uses your 48h active flag

    return matchesSearch && matchesFilter;
  });

  // Filter Categories
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "user", label: "Users" },
    { id: "admin", label: "Admins" },
    { id: "recent", label: "Recent (48h)" },
  ];

  // Helper to format MongoDB dates beautifully (e.g., "Oct 12, 2025")
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-sm flex flex-col items-center">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading User Directory
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* 1️⃣ Page Header & Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            User Directory
          </h2>
          <p className="text-slate-500 font-medium mt-1 text-lg">
            Manage platform access and accounts.
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-5">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 border border-white shadow-inner">
              <Users size={28} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Total Users
              </p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter">
                {stats.total.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-5">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 border border-white shadow-inner">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Active Profiles (Last 48h)
              </p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter">
                {stats.active.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ Main List Container */}
      <div className="bg-white/60 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Toolbar: Filters & Search */}
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 pb-6 border-b border-white/50">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight shrink-0">
            Accounts
          </h3>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full xl:w-auto">
            {/* 🟢 NEW: Filter Pills */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              <div className="flex bg-white/50 p-1 rounded-2xl border border-white shadow-sm shrink-0">
                {filterOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                      activeFilter === f.id
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/80"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto shrink-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 pl-12 pr-4 py-3 bg-white/80 border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-semibold text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* 3️⃣ Responsive User List */}
        <div className="relative z-10 space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="text-slate-400" size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-700 mb-1">
                No users found
              </h4>
              <p className="text-slate-500 font-medium">
                Try adjusting your search or filter settings.
              </p>
            </div>
          ) : (
            filteredUsers.map((u) => (
              <div
                key={u.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white shadow-sm hover:shadow-md transition-all duration-300 gap-4 md:gap-0 group"
              >
                {/* Left Side: Avatar & Identity */}
                <div className="flex items-center gap-4 overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border border-white shadow-inner shrink-0 ${
                      u.role === "admin"
                        ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {u.firstName.charAt(0)}
                    {u.lastName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2 truncate">
                      {u.firstName} {u.lastName}
                      {/* 🟢 Render a green dot if the user is currently active (last 48h) */}
                      {u.active && u.role !== "admin" && (
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                          title="Active in last 48 hours"
                        ></span>
                      )}
                      {u.role === "admin" && (
                        <Shield
                          size={14}
                          className="text-indigo-500 shrink-0"
                        />
                      )}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                      <Mail size={12} className="opacity-70 shrink-0" />{" "}
                      <span className="truncate">{u.email}</span>
                    </p>
                  </div>
                </div>

                {/* Right Side: Meta Info & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 pt-4 md:pt-0 border-t md:border-0 border-slate-100 mt-2 md:mt-0 shrink-0">
                  <div className="flex flex-col md:items-end">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 hidden md:block">
                      Joined
                    </p>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar
                        size={14}
                        className="text-slate-400 md:hidden"
                      />
                      {formatDate(u.joined)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                        u.role === "admin"
                          ? "bg-indigo-50/50 text-indigo-700 border-indigo-200"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {u.role.toUpperCase()}
                    </span>

                    <button
                      onClick={() =>
                        handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`)
                      }
                      disabled={u.role === "admin"}
                      className="p-3 text-slate-400 bg-white border border-white shadow-sm hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title={
                        u.role === "admin"
                          ? "Cannot delete admin"
                          : "Delete User"
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
