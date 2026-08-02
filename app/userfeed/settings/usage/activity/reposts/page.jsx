"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

// RTK Query Hook
import { useGetMyRepostsQuery } from "../../../../../redux/api/feedApi"; // Adjust relative path if needed
import PostGrid from "../../../../../components/PostGrid";

const filters = ["All", "Tryouts", "Posts"];

export default function Reposts() {
  const [active, setActive] = useState("All");

  // Fetch reposts via RTK Query
  const { data: repostsResponse, isLoading, isError, refetch } = useGetMyRepostsQuery();

  // Extract posts directly from response payload: response -> data -> posts
  const postsWithTime = useMemo(() => {
    const rawPosts = repostsResponse?.data?.posts || [];

    return rawPosts.map((post) => ({
      ...post,
      createdAt: post.created_at || post.createdAt || new Date().toISOString(),
    }));
  }, [repostsResponse]);

  // Filter posts based on active filter tab
  const filteredPosts = useMemo(() => {
    if (active === "All") return postsWithTime;

    return postsWithTime.filter((post) => {
      const postType = (post.type || "").toLowerCase();

      if (active === "Tryouts") {
        return postType === "tryout" || post.isTryout || post.category?.toLowerCase() === "tryout";
      }

      if (active === "Posts") {
        return postType !== "tryout" && !post.isTryout && post.category?.toLowerCase() !== "tryout";
      }

      return true;
    });
  }, [postsWithTime, active]);

  return (
    <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
      <Link
        href="/userfeed/settings/usage/activity"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 w-fit"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Activity</span>
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Reposts</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-6 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Posts Section */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-3 max-w-3xl mx-auto gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-red-500 font-medium">Failed to load reposts.</p>
            <button
              onClick={() => refetch()}
              className="text-xs text-teal-600 underline cursor-pointer hover:text-teal-700"
            >
              Try again
            </button>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-3 max-w-3xl mx-auto gap-4">
            {filteredPosts.map((post) => (
              <PostGrid key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No {active.toLowerCase()} found in your reposts.
          </p>
        )}
      </div>
    </div>
  );
}