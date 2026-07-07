"use client";

import { useState } from "react";
import SearchExplore from "../../components/Search/SearchExplore";
import FilterBar from "./FilterBar";
import TrendingSection from "./TrendingSection";
import ScoutProfile from "../../components/ScoutProfile";

import { useGetTrendingPostsQuery } from "../../redux/api/feedApi";
import { useGetScoutsQuery } from "../../redux/api/profileApi";

const Page = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("user");

  // Trending Posts
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useGetTrendingPostsQuery();

  // Scouts
  const {
    data: scoutsData,
    isLoading: scoutsLoading,
    isError: scoutsError,
  } = useGetScoutsQuery();

  const trendingPosts = trendingData?.data?.posts || [];
  const scouts = scoutsData?.data?.scouts || [];

  const isLoading = trendingLoading || scoutsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-3xl px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold">Explore</h1>

        <SearchExplore
          query={query}
          setQuery={setQuery}
          placeholder="Search users, posts, communities..."
        />

        <div className="space-y-6">
          <FilterBar />

          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>

              <p className="text-sm text-gray-500">
                Loading explore...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold">Explore</h1>

      <SearchExplore
        query={query}
        setQuery={setQuery}
        placeholder="Search users, posts, communities..."
      />

      <div className="space-y-6">
        <FilterBar />

        {trendingError ? (
          <p className="text-red-500">
            Failed to load trending posts.
          </p>
        ) : (
          <TrendingSection
            posts={trendingPosts}
            loading={false}
            error={false}
          />
        )}

        <div className="p-2 my-4 space-y-4">
          <p className="font-semibold text-lg">
            Suggested People
          </p>

          {scoutsError ? (
            <p className="text-red-500">
              Failed to load scouts.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {scouts.map((scout) => (
                <div
                  key={scout._id}
                  className="border px-4"
                >
                  <ScoutProfile profile={scout} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;