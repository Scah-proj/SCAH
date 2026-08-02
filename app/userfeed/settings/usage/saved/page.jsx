"use client";

import { useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Repeat, ImageIcon } from "lucide-react";

import PostGrid from "../../../../../../components/PostGrid";
import { useGetMyRepostsQuery } from "../../../../../redux/api/feedApi";

const filters = ["All", "Posts", "Tryouts"];

export default function Reposts() {
  const [active, setActive] = useState("All");

  const {
    data: repostsData,
    isLoading,
    isError,
  } = useGetMyRepostsQuery({
    page: 1,
    limit: 100,
  });

  const posts = repostsData?.data?.posts || [];

  // Filter posts based on selected tab
  const filteredPosts = posts.filter((post) => {
    if (active === "Posts") return post.type !== "tryout";
    if (active === "Tryouts") return post.type === "tryout";
    return true; // "All"
  });

  const totalCount = filteredPosts.length;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <Link
        href="/userfeed/settings/usage/activity"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition"
      >
        <MdArrowBack size={20} />
        <span>Back to Activity</span>
      </Link>

      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
            <Repeat className="text-teal-600" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reposts
            </h1>
            <p className="text-gray-500 mt-1">
              Your reposted posts and tryouts.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse bg-gray-200 rounded-md"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-red-500 font-medium">
            Failed to load reposted items.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && totalCount === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <ImageIcon size={36} className="text-gray-400" />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            No Reposted Items
          </h2>

          <p className="mt-2 text-gray-500 text-center max-w-sm">
            {active === "Tryouts"
              ? "Tryouts you repost will appear here."
              : active === "Posts"
              ? "Posts you repost will appear here."
              : "Items you repost will appear here."}
          </p>
        </div>
      )}

      {/* Reposts Grid */}
      {!isLoading && !isError && totalCount > 0 && (
        <>
          <div className="mb-5 text-sm text-gray-500">
            {totalCount} reposted item{totalCount !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {filteredPosts.map((post) => (
              <PostGrid
                key={post.id || post._id}
                post={post}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}