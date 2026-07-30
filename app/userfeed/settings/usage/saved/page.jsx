"use client";

import { useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Bookmark, ImageIcon } from "lucide-react";

import PostGrid from "../../../../components/PostGrid";
import { useGetSavedPostsQuery } from "../../../../redux/api/feedApi";

const filters = ["All", "Posts", "Tryouts"];

export default function SavedPage() {
  const [active, setActive] = useState("All");

  const { data, isLoading, isError } = useGetSavedPostsQuery({
    page: 1,
    limit: 100,
  });

  const posts = data?.data?.posts || [];

  const filteredPosts = posts.filter((post) => {
    if (active === "All") return true;
    if (active === "Posts") return post.type !== "tryout";
    if (active === "Tryouts") return post.type === "tryout";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <Link
        href="/userfeed/settings"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition"
      >
        <MdArrowBack size={20} />
        <span>Back to Settings</span>
      </Link>

      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
            <Bookmark className="text-teal-600" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Saved
            </h1>
            <p className="text-gray-500 mt-1">
              Your saved posts and tryouts.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 gap-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse bg-gray-200 rounded-md"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-red-500 font-medium">
            Failed to load saved posts.
          </p>
        </div>
      )}

      {!isLoading && !isError && filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <ImageIcon size={36} />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            No Saved Items
          </h2>

          <p className="mt-2 text-gray-500 text-center max-w-sm">
            Posts and tryouts you save will appear here.
          </p>
        </div>
      )}

      {!isLoading && !isError && filteredPosts.length > 0 && (
        <>
          <div className="mb-5 text-sm text-gray-500">
            {filteredPosts.length} saved item
            {filteredPosts.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {filteredPosts.map((post) => (
              <PostGrid
                key={post._id || post.id}
                post={post}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}