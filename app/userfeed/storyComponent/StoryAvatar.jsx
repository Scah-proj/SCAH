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
  latestStory, // the most recent story for this user, used to detect a text-only post
}) {
  const [hasError, setHasError] = useState(false);

  const isTextStory =
    String(latestStory?.media?.type || latestStory?.type || "").toLowerCase() ===
    "text";

  const textBackgroundColor = latestStory?.media?.backgroundColor || "#000000";

  return (
    <div className="flex shrink-0 p-2">
      <button
        onClick={onClick}
        className={`relative p-[2px] rounded-full ${
          hasStory
            ? hasUnseenStories
              ? "bg-gradient-to-tr from-teal-500 to-blue-500"
              : "bg-gray-300"
            : "bg-gray-300"
        }`}
      >
        <div
          className="w-12 h-12 rounded-full overflow-hidden border flex items-center justify-center"
          style={
            isTextStory
              ? { backgroundColor: textBackgroundColor }
              : undefined
          }
        >
          {isTextStory ? (
            // Text-only story: no image to show, the background color
            // itself is the preview.
            <span className="sr-only">Text story</span>
          ) : avatar && !hasError ? (
            <Image
              src={avatar}
              alt="Profile"
              width={48}
              height={48}
              className="object-cover w-full h-full"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

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
      </button>
    </div>
  );
}