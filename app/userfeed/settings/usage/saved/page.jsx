"use client";

import { useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Bookmark, ImageIcon } from "lucide-react";

import PostGrid from "../../../../components/PostGrid";
import Trials from "../../../../components/trials"; // Adjust path if needed
import { useGetSavedPostsQuery } from "../../../../redux/api/feedApi";
import { useGetSavedTryoutsQuery } from "../../../../redux/api/tryoutApi";

const filters = ["Posts", "Tryouts"];

export default function SavedPage() {
  const [active, setActive] = useState("Posts");

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useGetSavedPostsQuery({
    page: 1,
    limit: 100,
  });

  const {
    data: tryoutsData,
    isLoading: tryoutsLoading,
    isError: tryoutsError,
  } = useGetSavedTryoutsQuery({
    page: 1,
    limit: 100,
  });

  const posts = postsData?.data?.posts || [];
  const tryouts = tryoutsData?.data?.tryouts || [];

  // "Posts" here means saved feed posts that AREN'T tryout-type posts
  const filteredPosts = posts.filter((post) => post.type !== "tryout");

  const showTryouts = active === "Tryouts";
  const showPosts = active === "Posts";

  const isLoading = (showPosts && postsLoading) || (showTryouts && tryoutsLoading);
  const isError = (showPosts && postsError) || (showTryouts && tryoutsError);

  const totalCount = showPosts ? filteredPosts.length : tryouts.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link
        href="/userfeed/settings"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
      >
        <MdArrowBack size={18} />
        <span>Back to Settings</span>
      </Link>

      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
            <Bookmark className="text-teal-600" size={20} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Saved
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              Your saved posts and tryouts.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 sm:pb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Responsive Loading Skeleton */}
      {isLoading && (
        <div
          className={`grid ${
            showPosts
              ? "grid-cols-3 gap-1 sm:gap-2"
              : "grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          }`}
        >
          {[...Array(showPosts ? 9 : 4)].map((_, i) => (
            <div
              key={i}
              className={`${
                showPosts ? "aspect-square" : "h-56 sm:h-64"
              } animate-pulse bg-gray-200 rounded-lg`}
            />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <p className="text-red-500 font-medium text-sm sm:text-base">
            Failed to load saved items.
          </p>
        </div>
      )}

      {!isLoading && !isError && totalCount === 0 && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <ImageIcon size={30} className="text-gray-400" />
          </div>

          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-900">
            No Saved Items
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center max-w-xs sm:max-w-sm">
            {showPosts
              ? "Posts you save will appear here."
              : "Tryouts you save will appear here."}
          </p>
        </div>
      )}

      {!isLoading && !isError && totalCount > 0 && (
        <>
          <div className="mb-4 sm:mb-5 text-xs sm:text-sm text-gray-500">
            {totalCount} saved item{totalCount !== 1 ? "s" : ""}
          </div>

          {/* Posts — Always 3 Columns */}
          {showPosts && (
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {filteredPosts.map((post) => (
                <PostGrid key={post._id || post.id} post={post} />
              ))}
            </div>
          )}

          {/* Tryouts — 1 Column on Mobile, 2 Columns on Tablet/Desktop */}
          {showTryouts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {tryouts.map((tryout) => (
                <Trials
                  key={tryout._id || tryout.id}
                  trial={{ ...tryout, isSaved: true }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}