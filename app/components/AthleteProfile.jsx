"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { User } from "lucide-react";

export default function AthleteProfile({ profile }) {
  const router = useRouter();

  const user = profile?.userId || profile?.user || {};

  const name =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    profile?.name ||
    "Unknown Athlete";

  const profilePicture =
    profile?.profilePicture ||
    profile?.media?.profilePicture;

  // clubName lives inside the athlete's current/most recent experience entry
  const club =
    profile?.experience?.[0]?.clubName ||
    profile?.position ||
    profile?.sport ||
    "Member";

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
  <div className="@container border border-gray-200 rounded-xl bg-white p-3 my-4">
    <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border shrink-0 flex items-center justify-center">
          {profilePicture ? (
            <Image
              src={profilePicture}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-gray-500" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight break-words">
            {name}
          </p>
          <p className="text-xs text-gray-500">{club}</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleViewProfile}
        className="w-full @md:w-auto shrink-0 border border-teal-600 bg-white text-teal-600 rounded-full px-3 py-2 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-teal-50 transition"
      >
        <MdOutlinePersonAddAlt size={14} />
        Connect
      </button>
    </div>
  </div>
);
}