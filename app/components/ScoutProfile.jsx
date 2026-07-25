"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScoutProfile({ profile }) {
  const router = useRouter();

  const user = profile?.userId || profile?.user || {};

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

  const userId =
    user?.userId ||
    user?._id ||
    user?.id ||
    profile?.userId ||
    profile?._id ||
    profile?.id ||
    profile?.userId?._id ||
    profile?.userId?.id;

  const handleViewProfile = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
    }
  };

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

      <button
        onClick={handleViewProfile}
        className="border rounded-sm px-3 py-1 text-xs font-semibold text-teal-600"
      >
        View Profile
      </button>
    </div>
  );
}