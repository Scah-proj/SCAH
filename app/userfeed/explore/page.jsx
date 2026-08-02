"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose, MdPersonAdd } from "react-icons/md";
import { User } from "lucide-react";
import SearchExplore from "../../components/Search/SearchExplore";
import FilterBar from "./FilterBar";
import TrendingSection from "./TrendingSection";

import { useGetTrendingPostsQuery } from "../../redux/api/feedApi";
import {
  useDismissSuggestionMutation,
  useGetPeopleYouMayKnowQuery,
} from "../../redux/api/recommendationApi";

const Page = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("user");

  // Trending Posts
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useGetTrendingPostsQuery();

  // People You May Know
  const {
    data: suggestedPeople,
    isLoading: peopleLoading,
    isError: peopleError,
  } = useGetPeopleYouMayKnowQuery({ page: 1, limit: 20 });
  const [dismissSuggestion] = useDismissSuggestionMutation();

  const trendingPosts = trendingData?.data?.posts || [];
  const people = Array.isArray(suggestedPeople)
    ? suggestedPeople
    : suggestedPeople?.data?.suggestions ||
      suggestedPeople?.suggestions ||
      suggestedPeople?.data?.users ||
      suggestedPeople?.data ||
      [];

  const handleDismiss = async (userId) => {
    if (!userId) return;

    try {
      await dismissSuggestion(userId).unwrap();
    } catch (error) {
      console.error("Failed to dismiss user:", error);
    }
  };

  const isLoading = trendingLoading || peopleLoading;

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

          {peopleError ? (
            <p className="text-red-500">
              Failed to load suggestions.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {people.map((item, index) => {
                const userObj = item?.user || item;
                const id = userObj?._id || userObj?.id;
                const name =
                  userObj?.name ||
                  `${userObj?.firstName || ""} ${userObj?.lastName || ""}`.trim() ||
                  "User";
                const subTitle = userObj?.role || userObj?.sport || "Member";
                const avatar =
                  userObj?.picture ||
                  userObj?.avatar ||
                  userObj?.profilePicture;

                return (
                  <div
                    key={id || index}
                    className="relative flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 transition-shadow hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => handleDismiss(id)}
                      className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-gray-600"
                      title="Dismiss suggestion"
                      aria-label={`Dismiss ${name}`}
                    >
                      <MdClose size={18} />
                    </button>

                    <Link href={`/profile/${id}`} className="flex items-center space-x-3 pr-6">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt={name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-500">
                          <User className="h-6 w-6" />
                        </div>
                      )}
                      <div>
                        <p className="line-clamp-1 text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-xs capitalize text-gray-500">{subTitle}</p>
                      </div>
                    </Link>

                    <Link
                      href={`/profile/${id}`}
                      className="rounded-full bg-teal-50 p-2 text-teal-700 transition-colors hover:bg-teal-100"
                      title="Connect"
                      aria-label={`View ${name}'s profile`}
                    >
                      <MdPersonAdd size={20} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
