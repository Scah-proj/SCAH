"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FriendSearch from "../../../../components/Search/SearchFriends";
import { useGetMutualsQuery } from "../../../../redux/api/connectionApi"; // Adjust path if needed

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetMutualsQuery(undefined);

  // Safely extract mutuals array from your backend payload structure
  const mutuals = data?.data?.mutuals || [];

  // Filter friends based on search query using name
  const filteredFriends = mutuals.filter((friend) => {
    const friendName = friend?.name || "";
    return friendName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
      <div className="space-y-3">
        <Link
          href="/userfeed/settings"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Settings</span>
        </Link>
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
          Close Friends
        </h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Searchbar */}
        <div>
          <FriendSearch 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2 text-gray-600" />
            <p className="text-sm font-medium">Loading your friends...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-8 text-red-500">
            <p className="text-sm font-medium">Failed to load friends. Please try refreshing.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredFriends.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-gray-500 font-medium">
              {searchTerm ? "No friends match your search." : "No mutual friends found."}
            </p>
          </div>
        )}

        {/* Friends List */}
        {!isLoading && !isError && filteredFriends.length > 0 && (
          <div className="space-y-4">
            {filteredFriends.map((friend) => {
              const displayName = friend.name || "User";
              const profilePic = friend.picture || "/wen.webp";

              return (
                <div
                  key={friend._id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border relative flex-shrink-0">
                      <Image
                        src={profilePic}
                        alt={displayName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold block text-gray-900">{displayName}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">
                    <ChevronRight size={18} />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;