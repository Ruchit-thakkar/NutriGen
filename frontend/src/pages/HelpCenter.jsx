import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Mail,
  ChevronDown,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const FAQ_DATA = [
  {
    question: "How is my plan generated?",
    answer:
      "We use your profile data (height, weight, goals) to calculate optimal macros and filter recipes from our database using our AI engine.",
  },
  {
    question: "Can I change my dietary preferences?",
    answer:
      "Yes! Go to the 'Profile' tab to update your preferences anytime. This will automatically recalibrate your engine and generate a fresh plan.",
  },
  {
    question: "How do I track my daily progress?",
    answer:
      "Navigate to the 'Progress' tab on your dashboard. You can log your meals and weight to see your trend lines over time.",
  },
  {
    question: "Are the recipes allergy-friendly?",
    answer:
      "Absolutely. When setting up your Health Profile, simply select any allergies (like Peanuts, Gluten, or Dairy), and our system will instantly filter those out of your Daily Plan.",
  },
];

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState("faq"); // "faq" or "support"
  const [tickets, setTickets] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tickets when the user switches to the support tab
  useEffect(() => {
    if (activeTab === "support") {
      fetchTickets();
    }
  }, [activeTab]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/api/user/support");
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      toast.error("Failed to load your queries.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return toast.error("Please enter a message.");

    setIsSubmitting(true);
    try {
      const { data } = await api.post("/api/user/support", {
        message: newMessage,
      });
      if (data.success) {
        toast.success("Query submitted successfully!");
        setNewMessage("");
        // Add the new ticket to the top of the list
        setTickets((prev) => [data.ticket, ...prev]);
      }
    } catch (error) {
      toast.error("Failed to submit query.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full pt-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
      <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white max-w-3xl mx-auto">
        {/* Header */}
        <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 flex items-center gap-4 tracking-tight">
          <div className="bg-gradient-to-br from-teal-100 to-emerald-50 p-4 rounded-[1.5rem] shadow-inner border border-white">
            <HelpCircle className="text-teal-600" size={36} />
          </div>
          Help & Support
        </h3>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 bg-white/50 p-2 rounded-2xl border border-white">
          <button
            onClick={() => setActiveTab("faq")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
              activeTab === "faq"
                ? "bg-teal-500 text-white shadow-md"
                : "text-slate-500 hover:bg-white/80"
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab("support")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
              activeTab === "support"
                ? "bg-teal-500 text-white shadow-md"
                : "text-slate-500 hover:bg-white/80"
            }`}
          >
            My Queries
          </button>
        </div>

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div className="space-y-5 animate-in fade-in">
            {FAQ_DATA.map((faq, index) => (
              <details
                key={index}
                className="group bg-white/80 p-6 rounded-[1.5rem] border border-white shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-teal-100"
              >
                <summary className="font-bold text-lg list-none flex justify-between items-center text-slate-800 select-none tracking-tight">
                  {faq.question}
                  <span className="transition-transform duration-300 group-open:rotate-180 text-teal-600 bg-teal-50 p-2 rounded-full shadow-inner border border-white">
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="text-slate-500 mt-5 text-base font-medium leading-relaxed px-1 animate-in slide-in-from-top-2 fade-in duration-200">
                  {faq.answer}
                </p>
              </details>
            ))}

            <div className="mt-12 pt-10 border-t border-white/50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/40 p-8 rounded-[2rem] border border-white/60">
              <div>
                <p className="text-slate-900 font-black text-xl tracking-tight">
                  Still need help?
                </p>
                <p className="text-base font-medium text-slate-500 mt-1">
                  Our team is here for you.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("support")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-400 text-white px-8 py-4 rounded-2xl font-black hover:shadow-[0_10px_30px_rgba(20,184,166,0.3)] hover:-translate-y-0.5 transition-all active:scale-95 text-lg"
              >
                <MessageSquare size={20} /> Ask a Question
              </button>
            </div>
          </div>
        )}

        {/* Support Queries Section */}
        {activeTab === "support" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Submit New Query Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 p-6 rounded-[1.5rem] border border-white shadow-sm relative"
            >
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-3">
                How can we help you?
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your question or issue here..."
                className="w-full bg-slate-50 p-4 pr-16 rounded-[1rem] border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 min-h-[120px] font-medium text-slate-700"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute bottom-10 right-10 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>

            {/* List of Past Queries */}
            <div className="space-y-6">
              <h4 className="text-lg font-black text-slate-800 tracking-tight">
                Your Past Queries
              </h4>

              {isLoading ? (
                <div className="flex justify-center py-8 text-teal-500">
                  <Loader2 className="animate-spin" size={32} />
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center p-8 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                  <p className="text-slate-500 font-medium">
                    You haven't submitted any queries yet.
                  </p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-white/80 p-6 rounded-[1.5rem] border border-white shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      {ticket.status === "pending" ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-wider rounded-full border border-amber-100">
                          <Clock size={12} /> Pending Review
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase tracking-wider rounded-full border border-emerald-100">
                          <CheckCircle2 size={12} /> Replied
                        </span>
                      )}
                    </div>

                    <p className="text-slate-800 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                      {ticket.message}
                    </p>

                    {/* Admin Reply Block */}
                    {ticket.adminReply && (
                      <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2 flex items-center gap-2">
                          <Mail size={12} /> Support Team Reply
                        </p>
                        <p className="text-slate-700 font-medium whitespace-pre-wrap">
                          {ticket.adminReply}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
