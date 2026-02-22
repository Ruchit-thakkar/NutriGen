import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Loader2,
  Send,
  Edit3,
  User,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [editMode, setEditMode] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/api/admin/support");
      if (data.success) {
        const ticketList = data.tickets || [];
        setTickets(ticketList);

        const initialReplies = {};
        ticketList.forEach((ticket) => {
          if (ticket.adminReply) initialReplies[ticket._id] = ticket.adminReply;
        });
        setReplyText(initialReplies);
      }
    } catch (error) {
      toast.error("Failed to load support queries.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitReply = async (ticketId) => {
    const text = replyText[ticketId];
    if (!text || !text.trim()) return toast.error("Reply cannot be empty.");

    setIsSubmitting(ticketId);
    try {
      const { data } = await api.put(`/api/admin/support/${ticketId}`, {
        reply: text,
      });
      if (data.success) {
        toast.success("Reply saved successfully!");
        setEditMode((prev) => ({ ...prev, [ticketId]: false }));
        setTickets((prev) =>
          prev.map((t) => (t._id === ticketId ? data.ticket : t)),
        );
      }
    } catch (error) {
      toast.error("Failed to submit reply.");
    } finally {
      setIsSubmitting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
        <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
          Loading Inbox
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 border border-white shadow-sm">
            <MessageSquare size={24} />
          </div>
          Support Inbox
        </h2>
        <p className="text-slate-500 font-medium mt-2 text-lg">
          Manage and respond to user queries.
        </p>
      </div>

      <div className="space-y-6">
        {tickets.length === 0 ? (
          <div className="bg-white/60 p-12 rounded-[2rem] text-center border border-white shadow-sm">
            <p className="text-slate-500 font-bold text-lg">
              Inbox is empty. All caught up! 🎉
            </p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* User Details Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {ticket.user?.fullName?.firstName ||
                        ticket.user?.fullName ||
                        "Anonymous User"}
                    </h4>
                    <p className="text-xs font-medium text-slate-500">
                      {ticket.user?.email || "No email provided"}
                    </p>
                  </div>
                </div>

                {ticket.status === "pending" ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-wider rounded-full border border-amber-100">
                    <Clock size={12} /> Pending
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase tracking-wider rounded-full border border-emerald-100">
                    <CheckCircle2 size={12} /> Replied
                  </span>
                )}
              </div>

              {/* User's Message */}
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  User's Message
                </p>
                <p className="text-slate-800 font-medium bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
                  {ticket.message}
                </p>
              </div>

              {/* Admin Reply Input/Display */}
              <div className="bg-indigo-50/50 p-6 rounded-[1.5rem] border border-indigo-50">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    Your Response
                  </p>
                  {ticket.status === "replied" && (
                    <button
                      onClick={() =>
                        setEditMode({
                          ...editMode,
                          [ticket._id]: !editMode[ticket._id],
                        })
                      }
                      className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 transition-colors"
                    >
                      {editMode[ticket._id] ? (
                        <>
                          <X size={14} /> Cancel
                        </>
                      ) : (
                        <>
                          <Edit3 size={14} /> Edit Reply
                        </>
                      )}
                    </button>
                  )}
                </div>

                {ticket.status === "pending" || editMode[ticket._id] ? (
                  <div className="relative">
                    <textarea
                      value={replyText[ticket._id] || ""}
                      onChange={(e) =>
                        setReplyText({
                          ...replyText,
                          [ticket._id]: e.target.value,
                        })
                      }
                      placeholder="Type your response here..."
                      className="w-full bg-white p-4 pr-16 rounded-[1rem] border border-indigo-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[120px] font-medium text-slate-700"
                    />
                    <button
                      disabled={isSubmitting === ticket._id}
                      onClick={() => submitReply(ticket._id)}
                      className="absolute bottom-3 right-3 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting === ticket._id ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} />
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="text-indigo-950 font-medium whitespace-pre-wrap bg-white p-4 rounded-[1rem] border border-indigo-100 shadow-sm min-h-[60px]">
                    {ticket.adminReply}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
