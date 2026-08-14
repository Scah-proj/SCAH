"use client";

import Link from "next/link";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { Switch } from "../../../../../components/ui/switch";
import { Archive, ImageIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useGetArchivedStoriesQuery } from "../../../../redux/api/storyApi";

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

function formatArchivedDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const extractArray = (...candidates) => {
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
};

const Page = () => {
  const [settings, setSettings] = useState({
    story: false,
    live: false,
    original: false,
    cameraroll: false,
  });

  // Fetch real archived stories via RTK Query
  const {
    data: storiesData,
    isLoading,
    isError,
  } = useGetArchivedStoriesQuery();

  // Normalize array structures regardless of API envelope wrapper
  const archivedStories = useMemo(() => {
    const raw = extractArray(
      storiesData?.data?.stories,
      storiesData?.stories,
      storiesData?.data
    );
    return raw.map((item, idx) => ({
      id: item._id || item.id || `archived-story-${idx}`,
      imageUrl: item?.media?.url || item?.imageUrl || item?.url || "",
      caption: item?.caption || null,
      archivedAt: item?.archivedAt || item?.createdAt || item?.updatedAt,
    }));
  }, [storiesData]);

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
          Archives
        </h1>
      </div>

      {/* Archived content */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Archive className="text-teal-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Stories Archive</h2>
            <p className="text-sm text-gray-500">
              Stories you've archived are only visible to you.
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
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
              Failed to load archived stories.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && archivedStories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <ImageIcon size={28} className="text-gray-400" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
              No archived stories yet.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && archivedStories.length > 0 && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {archivedStories.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-md overflow-hidden bg-gray-100 group cursor-pointer"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || "Archived story"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                )}

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