"use client";

import Link from "next/link";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { Switch } from "../../../../../components/ui/switch";
import { Archive, ImageIcon } from "lucide-react";
import { useState } from "react";

const archiveOptions = [
  {
    key: "story",
    label: "Save story to archive",
  },
  {
    key: "original",
    label: "Save original photos",
  },
  {
    key: "cameraroll",
    label: "Save story to camera roll",
  },
];

// ── DEMO DATA ────────────────────────────────────────────────────────────
// Placeholder only. Swap these two arrays for the real query response
// once the archived-posts/archived-stories endpoint is wired in —
// everything below expects the same { id, imageUrl, caption, archivedAt }
// shape per item.
const DEMO_ARCHIVED_POSTS = [
  {
    id: "demo-post-1",
    imageUrl: "/wen.webp",
    caption: "Match day highlights vs Riverside FC",
    archivedAt: "2026-07-18T10:00:00Z",
  },
  {
    id: "demo-post-2",
    imageUrl: "/wen.webp",
    caption: "Training camp recap",
    archivedAt: "2026-06-02T10:00:00Z",
  },
  {
    id: "demo-post-3",
    imageUrl: "/wen.webp",
    caption: null,
    archivedAt: "2026-05-21T10:00:00Z",
  },
];

const DEMO_ARCHIVED_STORIES = [
  {
    id: "demo-story-1",
    imageUrl: "/wen.webp",
    caption: null,
    archivedAt: "2026-07-30T10:00:00Z",
  },
  {
    id: "demo-story-2",
    imageUrl: "/wen.webp",
    caption: null,
    archivedAt: "2026-07-15T10:00:00Z",
  },
];

const archiveTabs = ["Posts", "Stories"];

function formatArchivedDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const Page = () => {
  const [settings, setSettings] = useState({
    story: false,
    live: false,
    original: false,
    cameraroll: false,
  });

  const [activeTab, setActiveTab] = useState("Posts");

  // Swap these for real query state (isLoading/isError/data) once the
  // endpoint exists — layout below already handles those cases.
  const isLoading = false;
  const isError = false;
  const archivedPosts = DEMO_ARCHIVED_POSTS;
  const archivedStories = DEMO_ARCHIVED_STORIES;

  const activeItems = activeTab === "Posts" ? archivedPosts : archivedStories;

  const handleToggle = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-10">

      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/userfeed/settings"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Settings</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Archiving and downloading
        </h1>
    
      </div>

      {/* Settings */}
      <div className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">

        {archiveOptions.map((setting) => (
          <div
            key={setting.key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
          >
            {/* Text */}
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-gray-900">
                {setting.label}
              </p>
              <p className="text-xs text-gray-500">
                {setting.desc}
              </p>
            </div>

            {/* Switch */}
            <Switch
              checked={settings[setting.key]}
              onCheckedChange={(value) =>
                handleToggle(setting.key, value)
              }
            />
          </div>
        ))}

      </div>

      {/* Archived content */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Archive className="text-teal-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Archive</h2>
            <p className="text-sm text-gray-500">
              Posts and stories you've archived are only visible to you.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          {archiveTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse bg-gray-200 rounded-md"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-red-500 text-sm font-medium">
              Failed to load archived {activeTab.toLowerCase()}.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && activeItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <ImageIcon size={28} className="text-gray-400" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
              No archived {activeTab.toLowerCase()} yet.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && activeItems.length > 0 && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {activeItems.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-md overflow-hidden bg-gray-100 group cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption || "Archived item"}
                  fill
                  className="object-cover"
                />

                {/* Hover overlay with archived date */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs font-medium">
                    Archived {formatArchivedDate(item.archivedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;