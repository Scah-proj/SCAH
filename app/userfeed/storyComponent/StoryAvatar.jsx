"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { User } from "lucide-react";

export default function StoryAvatar({
  onClick,
  avatar,
  onAddStory,
  hasStory,
  hasUnseenStories,
  owner,
  isLive = false,
}) {
  const [hasError, setHasError] = useState(false);
  const avatarSrc =
    typeof avatar === "string" && avatar.trim() ? avatar.trim() : null;

  return (
    <div className="flex shrink-0 p-2">
      <button
        onClick={onClick}
        className={`relative p-[2px] rounded-full ${
          isLive
            ? "bg-gradient-to-tr from-rose-500 to-red-600 animate-pulse"
            : hasStory && hasUnseenStories
            ? "bg-gradient-to-tr from-teal-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        {/* ALWAYS show profile picture */}
        <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center">
          {avatarSrc && !hasError ? (
            <Image
              src={avatarSrc || "/defaultImage.jpg"}
              alt="Profile"
              width={48}
              height={48}
              className="object-cover w-full h-full"
              onError={() => setHasError(true)}
            />
          ) : (
            <User className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Add story button */}
        {owner && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onAddStory();
            }}
            className="absolute bottom-0 right-0 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm border-2 border-white"
          >
            <AiOutlinePlus />
          </span>
        )}

        {/* Live indicator badge */}
        {isLive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.2 bg-rose-600 text-[8px] font-black tracking-tighter text-white rounded-full uppercase border border-white shadow-sm">
            LIVE
          </span>
        )}
      </button>
    </div>
  );
}