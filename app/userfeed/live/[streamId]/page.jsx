"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Users,
  ShieldCheck,
  Award,
  Bookmark,
  Info,
  X,
  Check,
  UserPlus,
  Play,
} from "lucide-react";
import { toast } from "sonner";
import LiveBadge from "../../../components/live/LiveBadge";
import LiveChatOverlay from "../../../components/live/LiveChatOverlay";
import LiveReactions from "../../../components/live/LiveReactions";
import ScoutActionModal from "../../../components/live/ScoutActionModal";
import { useGetLiveStreamByIdQuery } from "../../../redux/api/liveStreamApi";
import { useGetTryoutsQuery } from "../../../redux/api/tryoutApi";

export default function LiveStreamRoomPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const streamId = resolvedParams?.streamId || "stream_1";

  const { data: stream, isLoading } = useGetLiveStreamByIdQuery(streamId);
  const { data: tryoutsData } = useGetTryoutsQuery();
  const tryouts = tryoutsData?.data || tryoutsData || [];

  // Scout & UI State
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPlayerBio, setShowPlayerBio] = useState(false);
  const [showScoutModal, setShowScoutModal] = useState(false);

  // Live comments state
  const [comments, setComments] = useState([
    { id: "1", userName: "Marcus Cole", role: "Fan", text: "Incredible sprint pace!", avatar: "/coa.webp" },
    { id: "2", userName: "Chelsea Academy Scout", role: "Scout", isScout: true, text: "Great recovery speed on that second rep.", avatar: "/toa.webp" },
    { id: "3", userName: "Coach Leo", role: "Coach", text: "Keep that hip level on the deceleration.", avatar: "/fan.webp" },
  ]);

  const broadcaster = stream?.broadcaster || {
    name: "David Uchenna",
    sport: "Football",
    position: "Center Back",
    club: "Sparta Prague",
    picture: "/roa.webp",
    height: "188 cm",
    weight: "78 kg",
    preferredFoot: "Right",
    isVerified: true,
  };

  const handleSendMessage = (text) => {
    setComments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        userName: "You",
        role: "Scout",
        isScout: true,
        text,
        avatar: "/fan.webp",
      },
    ]);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Stream link copied to clipboard!");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      !isBookmarked
        ? `${broadcaster.name} added to your Talent Watchlist!`
        : "Removed from Watchlist"
    );
  };

  return (
    <div className="relative w-full h-[calc(100dvh-4rem)] lg:h-dvh bg-slate-950 overflow-hidden flex flex-col justify-between">
      {/* Video Player Background Area */}
      <div className="absolute inset-0 z-0 bg-slate-950 flex items-center justify-center">
        {/* Simulated sports action loop or stream preview poster */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={stream?.thumbnail || broadcaster.picture || "/fan.webp"}
            alt={stream?.title || "Live Stream"}
            fill
            className="object-cover opacity-80 filter brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
        </div>
      </div>

      {/* Top Overlay: Back Button, Broadcaster Badge, and Actions */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/userfeed/live")}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition cursor-pointer"
            aria-label="Back to Live"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Broadcaster Profile Chip */}
          <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full pl-1.5 pr-3 py-1">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
              <Image
                src={broadcaster.picture || broadcaster.avatar || "/fan.webp"}
                alt={broadcaster.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-xs">
                  {broadcaster.name}
                </span>
                {broadcaster.isVerified && (
                  <ShieldCheck size={13} className="text-teal-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-gray-300 truncate">
                {broadcaster.position} • {broadcaster.club}
              </p>
            </div>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`ml-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition cursor-pointer ${
                isFollowing
                  ? "bg-white/20 text-white"
                  : "bg-teal-600 text-white hover:bg-teal-500"
              }`}
            >
              {isFollowing ? "Following" : "+ Follow"}
            </button>
          </div>
        </div>

        {/* Right Header Badges */}
        <div className="flex items-center gap-2">
          <LiveBadge size="sm" viewers={`${stream?.viewersCount || 142}`} />
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition cursor-pointer"
            aria-label="Share Stream"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Floating Scout Action Toolbar (Right Side of Screen) */}
      <div className="absolute right-4 top-24 z-30 flex flex-col items-center gap-3">
        {/* Quick Invite to Tryout Button */}
        <button
          onClick={() => setShowScoutModal(true)}
          className="group relative flex flex-col items-center gap-1 p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white shadow-xl backdrop-blur-md border border-teal-400/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Invite to Tryout"
        >
          <Award size={22} className="animate-bounce" />
          <span className="text-[10px] font-bold tracking-tight">Invite</span>
        </button>

        {/* Player Stats HUD Trigger */}
        <button
          onClick={() => setShowPlayerBio(true)}
          className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition cursor-pointer"
          title="View Player Metrics"
        >
          <Info size={20} />
          <span className="text-[10px] font-medium text-gray-300">Stats</span>
        </button>

        {/* Watchlist Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border backdrop-blur-md transition cursor-pointer ${
            isBookmarked
              ? "bg-amber-500 text-black border-amber-400"
              : "bg-black/50 hover:bg-black/70 text-white border-white/20"
          }`}
          title="Add to Watchlist"
        >
          <Bookmark size={20} className={isBookmarked ? "fill-black" : ""} />
          <span className="text-[10px] font-medium">Watchlist</span>
        </button>
      </div>

      {/* Bottom Area: Live Chat & Reactions */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col gap-3">
        {/* Stream Title Pill */}
        <div className="inline-block bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-1.5 text-white max-w-sm">
          <p className="text-xs font-bold truncate">{stream?.title || "Live Pitch Combine"}</p>
          <p className="text-[10px] text-teal-400 font-medium">
            {stream?.sport || "Football"} • {stream?.category || "Live Scouting"}
          </p>
        </div>

        {/* Chat Feed */}
        <div className="max-w-md">
          <LiveChatOverlay
            comments={comments}
            onSendMessage={handleSendMessage}
            currentUser={{ name: "You" }}
          />
        </div>

        {/* Floating Reactions Bar */}
        <div className="flex justify-end pt-1">
          <LiveReactions />
        </div>
      </div>

      {/* Player Stats HUD Drawer / Modal */}
      {showPlayerBio && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden p-6 shadow-2xl text-gray-900">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-teal-600">
                  <Image
                    src={broadcaster.picture || broadcaster.avatar || "/fan.webp"}
                    alt={broadcaster.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm">{broadcaster.name}</h3>
                    {broadcaster.isVerified && <ShieldCheck size={14} className="text-teal-600" />}
                  </div>
                  <p className="text-xs text-gray-500">{broadcaster.club} • {broadcaster.sport}</p>
                </div>
              </div>

              <button
                onClick={() => setShowPlayerBio(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Metrics grid */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Physical & Match Metrics
            </h4>
            <div className="grid grid-cols-3 gap-2.5 bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-5 text-center">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Position</p>
                <p className="text-xs font-bold text-gray-900 mt-0.5">{broadcaster.position || "Forward"}</p>
              </div>
              <div className="border-x border-gray-200">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Height</p>
                <p className="text-xs font-bold text-gray-900 mt-0.5">{broadcaster.height || "185 cm"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Foot</p>
                <p className="text-xs font-bold text-gray-900 mt-0.5">{broadcaster.preferredFoot || "Right"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowPlayerBio(false);
                  setShowScoutModal(true);
                }}
                className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Invite to Tryout
              </button>
              <button
                onClick={() => {
                  setShowPlayerBio(false);
                  router.push(`/profile/${broadcaster.id || broadcaster._id || "1"}`);
                }}
                className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Full Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scout Trial Invitation Dialog */}
      <ScoutActionModal
        isOpen={showScoutModal}
        onClose={() => setShowScoutModal(false)}
        athlete={broadcaster}
        tryouts={tryouts}
      />
    </div>
  );
}
