"use client";

import Image from "next/image";

export default function ScoutProfile({ profile }) {
  const user = profile?.userId || {};

  const name =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    profile?.name ||
    "Unknown Scout";

  const photo =
    profile?.media?.profilePicture ||
    "/wen.webp";

  const subtitle =
    profile?.organization ||
    profile?.orgType ||
    profile?.sport ||
    "Scout";

  return (
    <div className="flex items-center justify-between py-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 overflow-hidden rounded-full border bg-gray-200">
          <Image
            src={photo}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold">
            {name}
          </h3>

          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      <button className="border rounded-sm px-3 py-1 text-xs font-semibold text-teal-600">
        View Profile
      </button>
    </div>
  );
}