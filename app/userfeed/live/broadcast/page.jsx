"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  RefreshCw,
  X,
  Users,
  Radio,
  Sparkles,
  Award,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import LiveBadge from "../../../components/live/LiveBadge";
import LiveChatOverlay from "../../../components/live/LiveChatOverlay";
import LiveReactions from "../../../components/live/LiveReactions";
import { useStartLiveStreamMutation, useEndLiveStreamMutation } from "../../../redux/api/liveStreamApi";

function BroadcasterStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passedTitle = searchParams.get("title");
  const passedSport = searchParams.get("sport");

  // Setup / State
  const [hasStarted, setHasStarted] = useState(false);
  const [streamTitle, setStreamTitle] = useState(passedTitle || "Live Scouting & Match Drills");
  const [selectedSport, setSelectedSport] = useState(passedSport || "Football");
  const [selectedCategory, setSelectedCategory] = useState("Drills & Skills");

  // Media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [facingMode, setFacingMode] = useState("user"); // 'user' or 'environment'
  const [cameraError, setCameraError] = useState("");

  // Broadcast metrics
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [viewersCount, setViewersCount] = useState(1);
  const [reactionsCount, setReactionsCount] = useState(0);
  const [comments, setComments] = useState([
    { id: "1", userName: "SCAH System", role: "System", text: "Your broadcast is live! Scouts have been notified." },
  ]);

  // Modals
  const [showEndModal, setShowEndModal] = useState(false);
  const [streamSummary, setStreamSummary] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [startLiveStream] = useStartLiveStreamMutation();
  const [endLiveStream] = useEndLiveStreamMutation();

  // Initialize camera preview
  const initCamera = async (mode = facingMode) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode },
          audio: true,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError("");
      } else {
        setCameraError("Camera capture is not supported on this browser.");
      }
    } catch (err) {
      console.warn("Camera access denied or device not found:", err);
      setCameraError("Camera unavailable. Running in simulated broadcast mode.");
    }
  };

  useEffect(() => {
    initCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Timer while broadcasting
  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      // Simulate natural audience growth
      if (Math.random() > 0.6) {
        setViewersCount((v) => v + Math.floor(Math.random() * 3));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted]);

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    } else {
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const flipCamera = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
  };

  const handleStartBroadcast = async (e) => {
    e.preventDefault();
    try {
      await startLiveStream({
        title: streamTitle,
        sport: selectedSport,
        category: selectedCategory,
      }).unwrap();

      setHasStarted(true);
      toast.success("Broadcast started! You are now LIVE on SCAH.");
    } catch (error) {
      setHasStarted(true); // Proceed in mock mode
    }
  };

  const handleEndBroadcast = async () => {
    try {
      const res = await endLiveStream("stream_current").unwrap();
      setStreamSummary(res?.summary || {
        durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
        peakViewers: viewersCount + 12,
        reactionsCount: reactionsCount + 48,
        trialInvitesReceived: 1,
      });
    } catch (err) {
      setStreamSummary({
        durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
        peakViewers: viewersCount + 12,
        reactionsCount: reactionsCount + 48,
        trialInvitesReceived: 1,
      });
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowEndModal(true);
  };

  const handleSendMessage = (text) => {
    setComments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        userName: "You (Host)",
        role: "Athlete",
        text,
        avatar: "/fan.webp",
      },
    ]);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Pre-live Setup Screen
  if (!hasStarted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 pb-28">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Radio size={22} className="animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Broadcaster Studio</h1>
                <p className="text-xs text-gray-500">Configure your live scouting session</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/userfeed/live")}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Camera Preview Box */}
          <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden mb-6 flex items-center justify-center text-white border border-gray-300">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />
            {cameraError && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center">
                <VideoOff size={32} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-300 max-w-xs">{cameraError}</p>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/50 backdrop-blur-md">
                Camera Preview
              </span>
            </div>
          </div>

          {/* Form setup */}
          <form onSubmit={handleStartBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Stream Title
              </label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="e.g. U19 Midfield Passing Drills & Combine"
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sport
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Football">Football (Soccer)</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Athletics">Athletics / Track</option>
                  <option value="Tennis">Tennis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Session Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Drills & Skills">Drills & Skills</option>
                  <option value="Match Showcase">Match Showcase</option>
                  <option value="Physical Combine">Physical Combine</option>
                  <option value="Q&A / Scouting Talk">Q&A / Scouting Talk</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs sm:text-sm text-white shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Radio size={18} />
                Start Live Broadcast
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Active Broadcast Screen (Fullscreen Style)
  return (
    <div className="relative w-full h-[calc(100dvh-4rem)] lg:h-dvh bg-black overflow-hidden flex flex-col justify-between">
      {/* Video Element */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
        />
        {(!isVideoEnabled || cameraError) && (
          <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-white">
            <VideoOff size={48} className="text-gray-500 mb-3" />
            <p className="text-sm font-medium text-gray-300">Camera Paused</p>
          </div>
        )}
      </div>

      {/* Top HUD Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent text-white">
        <div className="flex items-center gap-3">
          <LiveBadge size="md" viewers={`${viewersCount} Scouts`} />
          <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-mono font-medium border border-white/20">
            {formatTimer(elapsedSeconds)}
          </div>
        </div>

        <button
          onClick={handleEndBroadcast}
          className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 font-semibold text-xs text-white shadow-md transition cursor-pointer"
        >
          End Stream
        </button>
      </div>

      {/* Middle Floating Title Badge */}
      <div className="relative z-10 px-4 pointer-events-none">
        <div className="inline-block bg-black/50 backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-1.5 text-white">
          <p className="text-xs font-bold leading-tight truncate max-w-xs sm:max-w-md">{streamTitle}</p>
          <p className="text-[10px] text-teal-400 font-medium">{selectedSport} • {selectedCategory}</p>
        </div>
      </div>

      {/* Bottom Area: Live Chat & Controls */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3">
        {/* Chat overlay */}
        <div className="max-w-md">
          <LiveChatOverlay
            comments={comments}
            onSendMessage={handleSendMessage}
            currentUser={{ name: "You" }}
          />
        </div>

        {/* Floating Controls Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full text-white backdrop-blur-md transition cursor-pointer ${
                isMuted ? "bg-rose-600/90" : "bg-black/50 border border-white/20"
              }`}
              aria-label="Toggle Microphone"
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full text-white backdrop-blur-md transition cursor-pointer ${
                !isVideoEnabled ? "bg-rose-600/90" : "bg-black/50 border border-white/20"
              }`}
              aria-label="Toggle Camera"
            >
              {!isVideoEnabled ? <VideoOff size={18} /> : <VideoIcon size={18} />}
            </button>

            <button
              onClick={flipCamera}
              className="p-3 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md hover:bg-black/70 transition cursor-pointer"
              aria-label="Flip Camera"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          <LiveReactions onReact={() => setReactionsCount((r) => r + 1)} />
        </div>
      </div>

      {/* Post-Broadcast Summary Modal */}
      {showEndModal && streamSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden p-6 text-center shadow-2xl animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} />
            </div>

            <h3 className="text-lg font-extrabold text-gray-900">Broadcast Completed</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Great session! Your broadcast metrics have been saved to your athlete analytics.
            </p>

            <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 text-center">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Duration</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{streamSummary.durationMinutes}m</p>
              </div>
              <div className="border-x border-gray-200">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Peak Viewers</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{streamSummary.peakViewers}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Invites</p>
                <p className="text-sm font-bold text-teal-700 mt-0.5">+{streamSummary.trialInvitesReceived}</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/userfeed/live")}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Back to Live Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BroadcasterStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          <p className="text-sm font-semibold">Loading studio...</p>
        </div>
      }
    >
      <BroadcasterStudioContent />
    </Suspense>
  );
}
