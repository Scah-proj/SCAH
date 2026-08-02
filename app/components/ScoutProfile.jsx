"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScoutProfile({ profile }) {
  const router = useRouter();

  // Suggestions can be athletes, scouts, or general users. Some API responses
  // nest the account under `user`, while others return it directly.
  const user =
    (profile?.userId && typeof profile.userId === "object" && profile.userId) ||
    (profile?.user && typeof profile.user === "object" && profile.user) ||
    profile ||
    {};

  const name =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.name ||
    user.username ||
    profile?.name ||
    "Unknown user";

  const photo =
    user.profilePicture ||
    user.picture ||
    user.avatar ||
    user.media?.profilePicture ||
    profile?.media?.profilePicture ||
    "/wen.webp";

  const role =
    user.role ||
    user.userRole ||
    user.accountType ||
    profile?.role ||
    profile?.userRole ||
    profile?.accountType;

  const subtitle =
    (typeof role === "string" && role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()) ||
    profile?.organization ||
    profile?.orgType ||
    profile?.sport ||
    "User";

  const userId =
    user?._id ||
    user?.id ||
    user?.user_id ||
    (typeof user?.userId === "string" ? user.userId : undefined) ||
    profile?._id ||
    profile?.id ||
    profile?.user_id ||
    (typeof profile?.userId === "string" ? profile.userId : undefined) ||
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
