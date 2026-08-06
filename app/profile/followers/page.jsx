"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { MdCheckCircle, MdSearch, MdArrowBack } from "react-icons/md";
import {
  useGetMyFollowersQuery,
  useGetFollowersQuery,
} from "../../redux/api/connectionApi"; // adjust path to match your setup

export default function FollowersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = searchParams.get("userId"); // present only when viewing someone else's profile

  const currentUserId = useSelector((state) => state.auth?.user?._id); // adjust to your auth slice shape

  const isOwnProfile = !profileId || profileId === currentUserId;

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch MY followers if it's my own profile
  const {
    data: myFollowersData,
    isLoading: isMyFollowersLoading,
    isFetching: isMyFollowersFetching,
    isError: isMyFollowersError,
  } = useGetMyFollowersQuery(undefined, {
    skip: !isOwnProfile,
  });

  // Fetch OTHER user's followers if it's not my profile
  const {
    data: otherFollowersData,
    isLoading: isOtherFollowersLoading,
    isFetching: isOtherFollowersFetching,
    isError: isOtherFollowersError,
  } = useGetFollowersQuery(profileId, {
    skip: isOwnProfile || !profileId,
  });

  const isLoading = isOwnProfile ? isMyFollowersLoading : isOtherFollowersLoading;
  const isFetching = isOwnProfile ? isMyFollowersFetching : isOtherFollowersFetching;
  const isError = isOwnProfile ? isMyFollowersError : isOtherFollowersError;
  const response = isOwnProfile ? myFollowersData : otherFollowersData;

  // Payload shape: { success, message, data: { followers: [...], pagination: {...} } }
  const followers = response?.data?.followers || [];
  const pagination = response?.data?.pagination;

  // Client-side filter by name, firstName, lastName, or email
  const query = searchTerm.trim().toLowerCase();
  const filteredFollowers = query
    ? followers.filter((follower) => {
        const displayName =
          follower?.name ||
          `${follower?.firstName || ""} ${follower?.lastName || ""}`.trim();
        return (
          displayName.toLowerCase().includes(query) ||
          follower?.email?.toLowerCase().includes(query)
        );
      })
    : followers;

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 sm:bg-transparent">
      {/* Top bar: back button + title + thin loading indicator */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        {isFetching && (
          <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
            <div className="h-full w-1/3 bg-teal-500 animate-[loading-bar_1s_ease-in-out_infinite]" />
          </div>
        )}

        <div className="flex items-center gap-3 px-3 sm:px-4 py-3">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition flex-shrink-0"
          >
            <MdArrowBack size={20} className="text-gray-700" />
          </button>

          <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
            Followers {pagination?.total ? `(${pagination.total})` : ""}
          </h1>

          {isLoading && (
            <span className="ml-auto w-4 h-4 border-2 border-gray-300 border-t-teal-600 rounded-full animate-spin flex-shrink-0" />
          )}
        </div>

        {followers.length > 0 && (
          <div className="px-3 sm:px-4 pb-3">
            <div className="relative">
              <MdSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search followers..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-0 sm:px-4 py-0 sm:py-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="w-8 h-8 border-[3px] border-gray-200 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading followers...</p>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500 text-sm">
            Failed to load followers.
          </div>
        ) : (
          <div className="bg-white sm:rounded-xl sm:shadow-sm border-y sm:border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {followers.length === 0 ? (
              <p className="p-8 text-center text-sm text-gray-500">No followers yet.</p>
            ) : filteredFollowers.length === 0 ? (
              <p className="p-8 text-center text-sm text-gray-500">
                No followers match &quot;{searchTerm}&quot;.
              </p>
            ) : (
              filteredFollowers.map((follower) => {
                const displayName =
                  follower?.name ||
                  `${follower?.firstName || ""} ${follower?.lastName || ""}`.trim() ||
                  follower?.email?.split("@")[0] ||
                  "User";

                const avatar = follower?.picture || "/defaultImage.jpg";

                return (
                  <div
                    key={follower._id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <Link
                      href={`/profile/${follower._id}`}
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <Image
                        src={avatar}
                        alt={displayName}
                        width={48}
                        height={48}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {displayName}
                          </p>
                          {follower?.isVerified && (
                            <MdCheckCircle
                              className="text-teal-500 flex-shrink-0"
                              size={16}
                              title="Verified User"
                            />
                          )}
                        </div>
                        {follower?.email && (
                          <p className="text-xs text-gray-500 truncate">
                            {follower.email}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        )}

        {pagination?.hasMore && (
          <p className="mt-3 text-center text-xs text-gray-400 px-4 pb-4">
            Showing {followers.length} of {pagination.total} followers
          </p>
        )}
      </div>
    </div>
  );
}