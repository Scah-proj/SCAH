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
  Calendar,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import ScoutActionModal from "../../../../components/live/ScoutActionModal";
import { useGetLiveReplayByIdQuery } from "../../../../redux/api/liveStreamApi";
import { useGetTryoutsQuery } from "../../../../redux/api/tryoutApi";

export default function LiveReplayViewerPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const replayId = resolvedParams?.replayId || "replay_1";

  const { data: replay, isLoading } = useGetLiveReplayByIdQuery(replayId);
  const { data: tryoutsData } = useGetTryoutsQuery();
  const tryouts = tryoutsData?.data || tryoutsData || [];

  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScoutModal, setShowScoutModal] = useState(false);

  const broadcaster = replay?.broadcaster || {
    name: "Neymar Jnr",
    sport: "Football",
    position: "Left Winger",
    club: "Free Agent",
    picture: "/hudson.webp",
    height: "175 cm",
    weight: "68 kg",
    preferredFoot: "Both",
    isVerified: true,
  };

  const metrics = replay?.metricsSummary || {
    sprintTopSpeed: "33.4 km/h",
    keyPasses: 6,
    shotsOnTarget: 4,
    scoutInvitesReceived: 3,
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Highlight link copied to clipboard!");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      !isBookmarked
        ? `${broadcaster.name} saved to your Scouting Watchlist!`
        : "Removed from Watchlist"
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push("/userfeed/live")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3.5 py-2 rounded-full shadow-sm transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Live Hub
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200">
            Recorded Highlight (VOD)
          </span>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition cursor-pointer shadow-sm"
            aria-label="Share replay"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Video Player Box */}
      <div className="relative aspect-video w-full rounded-3xl bg-black overflow-hidden shadow-2xl border border-gray-800 mb-6 flex items-center justify-center">
        {replay?.videoUrl ? (
          <video
            src={replay.videoUrl}
            poster={replay?.thumbnail || broadcaster.picture}
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={replay?.thumbnail || broadcaster.picture || "/hudson.webp"}
              alt="Highlight Preview"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-16 h-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-2xl">
                <Play size={28} className="translate-x-0.5 fill-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Broadcaster Bar & Scout Action Buttons */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-teal-600 bg-gray-100 flex-shrink-0">
            <Image
              src={broadcaster.picture || "/hudson.webp"}
              alt={broadcaster.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">{broadcaster.name}</h2>
              {broadcaster.isVerified && <ShieldCheck size={16} className="text-teal-600" />}
              <span className="text-[10px] font-semibold uppercase bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                {broadcaster.sport || "Football"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {broadcaster.position} • {broadcaster.club} • {broadcaster.height || "175 cm"}
            </p>
          </div>
        </div>

        {/* Scout Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isFollowing
                ? "bg-gray-100 text-gray-700 border-gray-300"
                : "bg-gray-900 text-white border-transparent hover:bg-gray-800"
            }`}
          >
            {isFollowing ? "Following" : "+ Follow"}
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              isBookmarked
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
            title="Save to Watchlist"
          >
            <Bookmark size={18} className={isBookmarked ? "fill-amber-700" : ""} />
          </button>

          <button
            onClick={() => setShowScoutModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition cursor-pointer"
          >
            <Award size={16} />
            <span>Invite to Tryout</span>
          </button>
        </div>
      </div>

      {/* Stream Highlight Details & Recorded Scout Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details (Col 1 & 2) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-lg font-bold text-gray-900 mb-2">
              {replay?.title || "Full 90-Min Trial Match Showcase"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" />
                {replay?.durationMinutes || 88} Minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-gray-400" />
                {replay?.viewsCount || 1420} Views
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                Broadcasted {new Date(replay?.recordedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              This is the official recorded VOD replay of the live scouting session. Scouts can scrub through the match timeline to review tactical movement, positioning, ball control, and physical endurance under competitive conditions.
            </p>
          </div>
        </div>

        {/* Scout Verified Metrics Panel (Col 3) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-teal-600" />
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Combine Metrics Recorded
            </h3>
          </div>

          <div className="space-y-3">
            {Object.entries(metrics).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-xs py-2 border-b border-gray-100">
                <span className="text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-bold text-gray-900">{val}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => router.push(`/profile/${broadcaster.id || broadcaster._id || "1"}`)}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              View Full Athlete Scouting Resume →
            </button>
          </div>
        </div>
      </div>

      {/* Scout Trial Invitation Modal */}
      <ScoutActionModal
        isOpen={showScoutModal}
        onClose={() => setShowScoutModal(false)}
        athlete={broadcaster}
        tryouts={tryouts}
      />
    </div>
  );
}
