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
  <div className="flex items-center justify-between gap-3 my-4">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center shrink-0">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-gray-500" />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-600 truncate">{club}</p>
      </div>
    </div>

    <button
      onClick={handleViewProfile}
      className="shrink-0 border border-gray-300 px-4 py-1 flex items-center justify-center rounded-full text-teal-600 text-sm font-semibold cursor-pointer"
    >
      <MdOutlinePersonAddAlt size={16} className="mr-1" />
      <span>Connect</span>
    </button>
  </div>
);
}