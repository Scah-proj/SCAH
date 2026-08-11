"use client";

import { useEffect, useState } from "react";
import AthleteProfile from "../../../profile/athleteConnect";
import Trials from "../../../components/trials";
import ScoutProfileConnect from "../../../profile/followScout";
import { useGetLatestTryoutQuery } from "../../../redux/api/tryoutApi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";

function canAccess(requiredRole, userType) {
  if (!requiredRole) return true;
  return requiredRole?.toLowerCase() === userType?.toLowerCase();
}

export default function Suggestions() {
  const { data: tryout, isLoading, isError } = useGetLatestTryoutQuery();

  // Grab user role from Redux
  const userType = useSelector((state) => state.auth?.user?.role);

  // Avoid hydration mismatch: role-dependent UI only renders after client mount,
  // since userType is unavailable during SSR but populated client-side (e.g. redux-persist)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isAthlete = canAccess("athlete", userType);
  const isScout = canAccess("scout", userType);

  return (
    <div className="flex flex-col">
      {/* Upcoming Trials Section - always visible */}
      <div className="rounded-lg">
        <div className="flex justify-between mb-6">
          <p className="font-semibold">Upcoming Trials</p>
          <Link
            href="/userfeed/tryout"
            className="text-teal-600 font-semibold cursor-pointer"
          >
            See All
          </Link>
        </div>
        <div>
          {isLoading && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader className="h-6 w-6 animate-spin text-teal-600" />
              <p className="text-sm text-gray-500">Loading trials...</p>
            </div>
          )}
          {isError && (
            <p className="text-sm text-red-600">Failed to load trials.</p>
          )}
          {tryout && <Trials key={tryout._id} trial={tryout} />}
        </div>
      </div>

      {/* Show Scout recommendations if logged-in user is an Athlete */}
      {mounted && isAthlete && (
        <div className="rounded-xl shadow-sm p-4 my-4 space-y-1">
          <p className="font-semibold text-lg">Trusted Scout on SCAH</p>
          <p className="text-sm text-gray-500">
            Based on your location and distance
          </p>
          <ScoutProfileConnect />
        </div>
      )}

      {/* Show Athlete recommendations if logged-in user is a Scout */}
      {mounted && isScout && (
        <div className="rounded-xl shadow-sm p-4 my-4 space-y-1">
          <p className="font-semibold text-lg">Recommended Athletes</p>
          <p className="text-sm text-gray-500">
            Based on your location and distance
          </p>
          <AthleteProfile />
        </div>
      )}
    </div>
  );
}