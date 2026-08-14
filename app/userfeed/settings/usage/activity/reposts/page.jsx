"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

// RTK Query Hook
import { useGetMyRepostsQuery } from "../../../../../redux/api/feedApi"; // Adjust relative path if needed
import PostGrid from "../../../../../components/PostGrid";

export default function Reposts() {
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
        ) : postsWithTime.length > 0 ? (
          <div className="grid grid-cols-3 max-w-3xl mx-auto gap-4">
            {postsWithTime.map((post) => (
              <PostGrid key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No reposts found.
          </p>
        )}
      </div>
    </div>
  );
}