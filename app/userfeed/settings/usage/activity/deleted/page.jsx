"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useGetDeletedPostsQuery } from "../../../../../redux/api/feedApi"; 
import PostCard from "../../../../../components/PostCard"; 

const Page = () => {
  const { data, isLoading, isError, error } = useGetDeletedPostsQuery();

  const posts = data?.data || [];

  return (
    <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
      <div className="space-y-3">
        <Link
          href="/userfeed/settings/usage/activity"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Activity</span>
        </Link>
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
          Recently Deleted
        </h1>
      </div>

      <div className="px-4 space-y-6">
        {isLoading ? (
          <div className="space-y-4 text-center py-8">
            <p className="text-gray-500 animate-pulse">Loading deleted posts...</p>
          </div>
        ) : isError ? (
          <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
            {error?.data?.message || "Failed to load deleted posts. Please try again."}
          </div>
        ) : posts.length === 0 ? (
          <div className="space-y-4 text-center py-8">
            <p className="text-gray-500">No recently deleted items</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id || post._id}
                post={post}
                isDeleted={true}
                showActions={false}
                showMenu={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;