"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { MdOutlinePersonAddAlt } from "react-icons/md";

export default function AthleteProfile({ profile }) {
  const router = useRouter();

  const user = profile?.userId || profile?.user || {};

  const name =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    profile?.name ||
    "Unknown Athlete";

  const profilePicture =
    profile?.profilePicture ||
    profile?.media?.profilePicture ||
    "/wen.webp";

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
    <div className="flex justify-between my-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
          <Image
            src={profilePicture}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-600">{club}</p>
        </div>
      </div>
      <div>
        <button
          onClick={handleViewProfile}
          className="border border-gray-300 px-4 py-1 flex items-center justify-center rounded-full text-teal-600 text-sm font-semibold cursor-pointer"
        >
          <MdOutlinePersonAddAlt size={16} className="mr-1" />
          <p>Connect</p>
        </button>
      </div>
    </div>
  );
}