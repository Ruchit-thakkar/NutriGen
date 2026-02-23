import React from "react";
import { LogOut, X } from "lucide-react";

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark blurry backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-rose-50 text-rose-500 p-3 rounded-2xl">
            <LogOut size={24} strokeWidth={2.5} />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
          Ready to leave?
        </h3>
        <p className="text-slate-500 font-medium mb-6">
          Are you sure you want to log out of your account? You will need to log
          back in to access your dashboard.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-colors"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
