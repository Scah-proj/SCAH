"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import { Loader } from "lucide-react";

import Trials from "../../components/trials";
import TryoutSearch from "../../components/Search/SearchTryout";
import { Button } from "../../../components/ui/button";

import { useSelector } from "react-redux";

import {
  useGetTryoutsQuery,
  useSearchTryoutsQuery,
  useGetSavedTryoutsQuery,
} from "../../redux/api/tryoutApi";

const Page = () => {
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    sport: "all",
    level: "all",
  });

  const sportOptions = [
    { value: "all", label: "All Sports" },
    { value: "Football", label: "Football" },
    { value: "Basketball", label: "Basketball" },
    { value: "Soccer", label: "Soccer" },
    { value: "Tennis", label: "Tennis" },
  ];

  const levelOptions = [
    { value: "all", label: "Any Levels" },
    { value: "Academy", label: "Academy" },
    { value: "Semi-Pro", label: "Semi-Pro" },
    { value: "Pro", label: "Pro" },
    { value: "Scholarship", label: "Scholarship" },
  ];

  // Fetch all tryouts
  const {
    data: allData,
    isLoading: loadingAll,
    isError,
    error,
  } = useGetTryoutsQuery(undefined, {
    skip: query.trim() !== "",
  });

  // Fetch searched tryouts
  const {
    data: searchData,
    isLoading: loadingSearch,
  } = useSearchTryoutsQuery(
    {
      q: query,
      sport: "",
    },
    {
      skip: query.trim() === "",
    }
  );

  // Neither getTryouts nor searchTryouts return an isSaved flag per item,
  // so a page refresh would otherwise lose bookmark state entirely. This
  // fetches the user's real saved-tryout list and is cross-referenced
  // below so the bookmark icon reflects actual persisted state.
  const { data: savedTryoutsData } = useGetSavedTryoutsQuery({
    page: 1,
    limit: 200,
  });

  const savedTryoutIds = useMemo(() => {
    const saved = savedTryoutsData?.data?.tryouts || [];
    return new Set(saved.map((t) => String(t._id || t.id)));
  }, [savedTryoutsData]);

  const loading = loadingAll || loadingSearch;

  // Choose dataset
  const tryOuts =
    query.trim() !== ""
      ? searchData?.data?.tryouts ?? []
      : allData?.data?.tryouts ?? [];

  // Apply filters locally
  const filteredTryouts = tryOuts.filter((trial) => {
    const sportMatch =
      filters.sport === "all" ||
      trial.sport?.toLowerCase() === filters.sport.toLowerCase();

    const levelMatch =
      filters.level === "all" ||
      trial.level?.toLowerCase() === filters.level.toLowerCase();

    return sportMatch && levelMatch;
  });

  if (loading) {
    return (
      <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Discover Tryouts
          </h1>

          <p className="text-gray-500 text-sm">
            Explore available sports tryouts and filter by sport or level.
          </p>
        </div>

        <div className="px-4 space-y-6">
          <TryoutSearch query={query} setQuery={setQuery} />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Filters
              </p>

              <div className="w-48">
                <Select
                  options={sportOptions}
                  value={sportOptions.find(
                    (item) => item.value === filters.sport
                  )}
                  isDisabled
                />
              </div>

              <div className="w-48">
                <Select
                  options={levelOptions}
                  value={levelOptions.find(
                    (item) => item.value === filters.level
                  )}
                  isDisabled
                />
              </div>
            </div>

            {user?.role === "Scout" && (
              <div className="flex items-center gap-3">
                <Button variant="outline" disabled>
                  Manage Tryouts
                </Button>
                <Button className="bg-teal-600" disabled>
                  Post Tryout
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-sm text-gray-500">Loading tryouts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-red-500">
          {error?.data?.message || "Failed to load tryouts."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Discover Tryouts
        </h1>

        <p className="text-gray-500 text-sm">
          Explore available sports tryouts and filter by sport or level.
        </p>
      </div>

      <div className="px-4 space-y-6">
        <TryoutSearch query={query} setQuery={setQuery} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Filters
            </p>

            <div className="w-48">
              <Select
                options={sportOptions}
                value={sportOptions.find(
                  (item) => item.value === filters.sport
                )}
                onChange={(option) =>
                  setFilters((prev) => ({
                    ...prev,
                    sport: option?.value || "all",
                  }))
                }
              />
            </div>

            <div className="w-48">
              <Select
                options={levelOptions}
                value={levelOptions.find(
                  (item) => item.value === filters.level
                )}
                onChange={(option) =>
                  setFilters((prev) => ({
                    ...prev,
                    level: option?.value || "all",
                  }))
                }
              />
            </div>
          </div>

          {user?.role === "Scout" && (
            <div className="flex items-center gap-3">
              <Link href="/userfeed/tryout/manageTryout">
                <Button variant="outline">
                  Manage Tryouts
                </Button>
              </Link>
              <Button className="bg-teal-600">
                <Link href="/userfeed/tryout/newTryout">
                  Post Tryout
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {filteredTryouts.length ? (
          filteredTryouts.map((trial) => (
            <Trials
              key={trial._id}
              trial={{
                ...trial,
                isSaved: savedTryoutIds.has(String(trial._id)),
              }}
            />
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No tryouts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;