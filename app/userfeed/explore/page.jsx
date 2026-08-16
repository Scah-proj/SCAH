"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose, MdPersonAdd } from "react-icons/md";
import { User, Search, Loader } from "lucide-react";
import SearchExplore from "../../components/Search/SearchExplore";
import FilterBar from "./FilterBar";
import TrendingSection from "./TrendingSection";

import { useGetTrendingPostsQuery } from "../../redux/api/feedApi";
import {
  useDismissSuggestionMutation,
  useGetPeopleYouMayKnowQuery,
} from "../../redux/api/recommendationApi";
import { useLazySearchUsersQuery } from "../../redux/api/profileApi";

// Pulls a display-ready { id, name, subTitle, avatar } out of the various
// shapes search/recommendation endpoints wrap users in.
const normalizeUser = (item) => {
  const userObj = item?.user || item;
  const id = userObj?._id || userObj?.id || userObj?.userId;
  const name =
    userObj?.name ||
    `${userObj?.firstName || ""} ${userObj?.lastName || ""}`.trim() ||
    "User";
  const subTitle = userObj?.role || userObj?.sport || "Member";
  const avatar =
    userObj?.picture ||
    userObj?.avatar ||
    userObj?.profilePicture ||
    userObj?.profile?.profilePicture;

  return { id, name, subTitle, avatar };
};

const Page = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("user");

  // Text typed into the top "Search people" input, debounced before it
  // triggers a request.
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  const [
    triggerSearchUsers,
    { data: searchResultsData, isFetching: isSearching },
  ] = useLazySearchUsersQuery();

  useEffect(() => {
    if (debouncedSearchTerm) {
      triggerSearchUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, triggerSearchUsers]);

  const isSearchActive = debouncedSearchTerm.length > 0;

  const searchResults = (
    Array.isArray(searchResultsData)
      ? searchResultsData
      : searchResultsData?.users ||
        searchResultsData?.results ||
        searchResultsData?.data ||
        []
  ).map(normalizeUser);

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

  // Reusable person card, shared between search results and suggested people.
  const renderPersonCard = (person, { onDismiss } = {}) => {
    const { id, name, subTitle, avatar } = person;

    return (
      <div
        key={id}
        className="relative flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 transition-shadow hover:shadow-md"
      >
        {onDismiss && (
          <button
            type="button"
            onClick={() => onDismiss(id)}
            className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-gray-600"
            title="Dismiss suggestion"
            aria-label={`Dismiss ${name}`}
          >
            <MdClose size={18} />
          </button>
        )}

        <Link
          href={`/profile/${id}`}
          className={`flex items-center space-x-3 ${onDismiss ? "pr-6" : ""}`}
        >
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
  };

  const searchBar = (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search people"
        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {isSearching && (
        <Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-teal-600" />
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-3xl px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold">Explore</h1>

        {searchBar}

        <SearchExplore
          query={query}
          setQuery={setQuery}
          placeholder="Search users, posts, communities..."
        />

        <div className="space-y-6">
          <FilterBar />

          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader className="h-6 w-6 animate-spin text-teal-600" />
            <p className="text-sm text-gray-500">Loading explore...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold">Explore</h1>

      {searchBar}

      {/* Search results take over the page while a search is active */}
      {isSearchActive ? (
        <div className="space-y-4">
          <p className="font-semibold text-lg">
            Results for "{debouncedSearchTerm}"
          </p>

          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-6 w-6 animate-spin text-teal-600" />
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-sm text-gray-500">
              No users found matching "{debouncedSearchTerm}".
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {searchResults.map((person) => renderPersonCard(person))}
            </div>
          )}
        </div>
      ) : (
        <>
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
              <h3 className="font-semibold text-lg">
                Suggested People
              </h3>

              {peopleError ? (
                <p className="text-red-500">
                  Failed to load suggestions.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {people.map((item) =>
                    renderPersonCard(normalizeUser(item), {
                      onDismiss: handleDismiss,
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;