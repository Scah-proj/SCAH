"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, FileText, Radio, Camera, Sparkles } from "lucide-react";

export default function CreateMenuModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm overflow-hidden p-6 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-gray-900 text-sm">Create & Showcase</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {/* Option 1: Create Post */}
          <button
            onClick={() => handleSelect("/profile/createPost")}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-teal-50/60 border border-gray-200/80 hover:border-teal-300 text-left transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition shadow-sm">
              <FileText size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm group-hover:text-teal-700 transition">
                Create Post
              </h4>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                Upload photos, highlight reels, and match updates
              </p>
            </div>
          </button>

          {/* Option 2: Go Live (Scouting Stream) */}
          <button
            onClick={() => handleSelect("/userfeed/live/broadcast")}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-50/50 hover:bg-rose-50 border border-rose-200/80 hover:border-rose-400 text-left transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition shadow-sm">
              <Radio size={22} className="animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-rose-700 transition">
                  Go Live (Scouting Stream)
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-rose-600 text-white tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                Broadcast live drills, combines, and matches to scouts
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
