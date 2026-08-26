"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

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
    <User className="w-5 h-5 text-gray-400" />;

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

  // IMPORTANT: `profile._id` (and `user._id`, since `user` falls back to
  // `profile` itself when there's no nested user object) is the Athlete/
  // Scout PROFILE document's own id — not the account id that /profile/:id
  // routes expect. The recommendations payload makes this concrete:
  // target._id is the Scout doc id, target.userId is the actual User id.
  // So the explicit userId field (string, or a populated object with its
  // own _id/id) must be checked BEFORE falling back to _id/id, otherwise
  // this always routes to the wrong (profile-document) id whenever userId
  // is present as a plain string, since _id/id resolve first and are
  // always truthy on a profile document.
  const rawUserId = profile?.userId ?? user?.userId;

  const userId =
    (typeof rawUserId === "string" && rawUserId) ||
    rawUserId?._id ||
    rawUserId?.id ||
    // Fallbacks below only apply when there's no userId field at all —
    // i.e. shapes where the object passed in already IS the user/account
    // itself, not a separate profile document referencing one.
    user?._id ||
    user?.id ||
    user?.user_id ||
    profile?._id ||
    profile?.id ||
    profile?.user_id;

  const handleViewProfile = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
    }
  };

  return (
    <div className="@container border border-gray-200 rounded-xl bg-white p-3 my-4">
    <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border shrink-0 flex items-center justify-center">
        {photo ? (
                    <Image
                      src={photo}
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

        <p className="text-xs text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>

    <button
      onClick={handleViewProfile}
      className="w-full @md:w-auto shrink-0 border border-teal-600 bg-white text-teal-600 rounded-full px-3 py-2 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-teal-50 transition"
      >
      View Profile
    </button>
    </div>
    </div>
  );
}