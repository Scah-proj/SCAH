"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Radio, Video, Users, Sparkles, Filter, ShieldCheck, Play, Clock, Film } from "lucide-react";
import LiveBadge from "../../components/live/LiveBadge";
import { useGetLiveStreamsQuery, useGetLiveReplaysQuery } from "../../redux/api/liveStreamApi";

const SPORTS_FILTERS = [
  "All",
  "Football",
  "Basketball",
  "Athletics",
  "Tennis",
];

export default function LiveScoutingPage() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState("All");

  const { data, isLoading } = useGetLiveStreamsQuery();
  const streams = data?.streams || [];

  const { data: replaysData } = useGetLiveReplaysQuery();
  const replays = replaysData?.replays || [];

  const filteredStreams = streams.filter((stream) => {
    if (selectedSport === "All") return true;
    return stream.sport?.toLowerCase() === selectedSport.toLowerCase();
  });

  const filteredReplays = replays.filter((replay) => {
    if (selectedSport === "All") return true;
    return replay.sport?.toLowerCase() === selectedSport.toLowerCase();
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28">
      {/* Hero Header & "Go Live" Action */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <LiveBadge size="sm" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              Real-Time Talent Evaluation
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Live Scouting & Sports Broadcasts
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Watch athletes broadcast live matchday combines, skill drills, and showcase sessions. Scouts can evaluate metrics and extend trial invitations in real time.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/userfeed/live/broadcast"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-500 font-semibold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Radio size={18} className="animate-pulse" />
              Go Live Now
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-gray-300 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md">
              <Users size={14} className="text-teal-400" />
              <span>{streams.reduce((acc, s) => acc + (s.viewersCount || 0), 0)} Scouts & Fans Watching</span>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 mb-6 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-2">
          {SPORTS_FILTERS.map((sport) => {
            const isActive = selectedSport === sport;
            return (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {sport}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-gray-500 hidden sm:block whitespace-nowrap">
          Showing {filteredStreams.length} Active Stream{filteredStreams.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Live Streams Grid */}
      {filteredStreams.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Radio size={28} />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">No Active Streams in {selectedSport}</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            There are no athletes currently streaming in this sport category. Be the first to start a scouting broadcast!
          </p>
          <Link
            href="/userfeed/live/broadcast"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition cursor-pointer"
          >
            <Video size={16} />
            Start a Broadcast
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStreams.map((stream) => {
            const broadcaster = stream.broadcaster || {};
            return (
              <div
                key={stream.id || stream._id}
                onClick={() => router.push(`/userfeed/live/${stream.id || stream._id}`)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col"
              >
                {/* Thumbnail / Stream Video Mock Preview */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <Image
                    src={stream.thumbnail || broadcaster.picture || "/fan.webp"}
                    alt={stream.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top overlay badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <LiveBadge size="sm" viewers={`${stream.viewersCount || 10} watching`} />
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-md">
                      {stream.category || "Scouting Combine"}
                    </span>
                  </div>

                  {/* Play icon overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom overlay: Broadcaster Quick Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/60 bg-gray-600 flex-shrink-0">
                        <Image
                          src={broadcaster.picture || broadcaster.avatar || "/fan.webp"}
                          alt={broadcaster.name || "Broadcaster"}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-xs truncate">
                        {broadcaster.name || "Athlete"}
                      </span>
                      {broadcaster.isVerified && (
                        <ShieldCheck size={14} className="text-teal-400 flex-shrink-0" />
                      )}
                    </div>

                    <span className="text-[11px] text-gray-300 font-normal">
                      {broadcaster.position || stream.sport}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-teal-700 transition">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {broadcaster.club || "Free Agent"} • {stream.sport || "Football"}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      <Sparkles size={12} />
                      Scout Evaluations Open
                    </span>
                    <span className="hover:underline text-gray-600">Join Stream →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Past Broadcast Highlights Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Film size={20} className="text-teal-700" />
            <h2 className="text-lg font-bold text-gray-900">Past Broadcast Highlights</h2>
          </div>
          <span className="text-xs text-gray-500">
            {filteredReplays.length} Saved Highlight{filteredReplays.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredReplays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReplays.map((replay) => {
              const broadcaster = replay.broadcaster || {};
              return (
                <div
                  key={replay.id || replay._id}
                  onClick={() => router.push(`/userfeed/live/replays/${replay.id || replay._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <Image
                      src={replay.thumbnail || broadcaster.picture || "/hudson.webp"}
                      alt={replay.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-black shadow-md">
                        Replay
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-white backdrop-blur-md">
                      <Clock size={11} />
                      <span>{replay.durationMinutes}m</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                        <Play size={20} className="fill-white translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-medium truncate">{broadcaster.name}</span>
                      <span className="text-[11px] text-gray-300">{replay.sport}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-teal-700 transition">
                        {replay.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {broadcaster.club || "Free Agent"} • {replay.viewsCount || 0} views
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span className="text-teal-700 font-semibold flex items-center gap-1">
                        <Sparkles size={12} />
                        Scout Metrics Recorded
                      </span>
                      <span className="hover:underline text-gray-600">Watch Replay →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-500 bg-white p-6 rounded-2xl border text-center">
            No highlights recorded yet for this sport.
          </p>
        )}
      </div>

      {/* Scout Info Banner */}
      <div className="mt-12 bg-white rounded-3xl p-6 border border-teal-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Are you a registered Scout or Coach?</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Watching live streams allows you to bookmark athletes to your Watchlist and send direct Trial Invitations with one click.
            </p>
          </div>
        </div>

        <Link
          href="/userfeed/tryout"
          className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition cursor-pointer"
        >
          Manage Your Tryouts
        </Link>
      </div>
    </div>
  );
}
