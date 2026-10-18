"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Award, CheckCircle, Bookmark, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function ScoutActionModal({
  isOpen,
  onClose,
  athlete = null,
  tryouts = [],
}) {
  const [selectedTryoutId, setSelectedTryoutId] = useState("");
  const [invitationNote, setInvitationNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("invite"); // 'invite' | 'watchlist'

  if (!isOpen || !athlete) return null;

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!selectedTryoutId) {
      toast.error("Please select a tryout to invite this athlete to.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulated processing
    setIsSubmitting(false);

    toast.success(`Invitation sent to ${athlete.name || "the athlete"}!`);
    onClose();
  };

  const handleSaveToWatchlist = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);

    toast.success(`${athlete.name || "Athlete"} added to your Scouting Watchlist!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 border-2 border-teal-600">
              <Image
                src={athlete.picture || athlete.avatar || "/fan.webp"}
                alt={athlete.name || "Athlete"}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 text-sm">{athlete.name || "Athlete"}</h3>
                <span className="text-[10px] font-semibold uppercase bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                  {athlete.sport || "Football"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {athlete.position || "Forward"} • {athlete.club || "Free Agent"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200/60 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("invite")}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === "invite"
                ? "border-teal-600 text-teal-700 bg-teal-50/30"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Award size={15} />
            Invite to Tryout
          </button>
          <button
            onClick={() => setActiveTab("watchlist")}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition ${
              activeTab === "watchlist"
                ? "border-teal-600 text-teal-700 bg-teal-50/30"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Bookmark size={15} />
            Add to Watchlist
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === "invite" ? (
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Select Active Tryout / Combine:
                </label>
                <select
                  value={selectedTryoutId}
                  onChange={(e) => setSelectedTryoutId(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">-- Choose a Tryout --</option>
                  {tryouts.map((t) => (
                    <option key={t.id || t._id} value={t.id || t._id}>
                      {t.title} ({t.city || "Venue TBD"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Scouting Note to Athlete (Optional):
                </label>
                <textarea
                  value={invitationNote}
                  onChange={(e) => setInvitationNote(e.target.value)}
                  placeholder="e.g. Great agility in the drills! We would love to evaluate you at our upcoming camp."
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send size={14} />
                  {isSubmitting ? "Sending Invite..." : "Send Trial Invitation"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <Bookmark size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Save to Talent Watchlist</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Pin this athlete to your private scout dashboard to track match updates, stream recordings, and performance statistics.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveToWatchlist}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Confirm & Save to Watchlist"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
