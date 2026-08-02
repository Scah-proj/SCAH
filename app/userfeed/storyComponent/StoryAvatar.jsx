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
}) {
  const [hasError, setHasError] = useState(false);

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
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border flex items-center justify-center">
          {avatar && !hasError ? (
            <Image
              src={avatar}
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