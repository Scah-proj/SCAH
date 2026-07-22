"use client";
import { use } from "react";
import Profile from "../profile/page";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";

function inferRole(profile) {
  if (profile?.role) return profile.role;

  const hasScoutSignals = Boolean(
    profile?.organization ||
    profile?.scoutingLevel ||
    profile?.scoutingFocus ||
    profile?.currentScoutingLevel
  );
  const hasAthleteSignals = Boolean(
    profile?.athleteId ||
    profile?.coreStrength?.length ||
    profile?.technicalSkills?.length ||
    profile?.currentPlayingLevel
  );

  if (hasScoutSignals && !hasAthleteSignals) return "Scout";
  if (hasAthleteSignals && !hasScoutSignals) return "Athlete";
  return undefined;
}

export default function Page({ params }) {
  const { id } = use(params);
  const {
    data,
    isLoading,
    isError,
  } = useGetPublicProfileQuery(id, {
    skip: !id,
  });
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
        <div className="text-center text-gray-500">Loading profile...</div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-500">
        Profile not found.
      </div>
    );
  }

  const profileWithRole = {
    ...data,
    profile: {
      ...data?.profile,
      role: inferRole(data?.profile),
    },
  };

  return (
    <Profile
      profile={profileWithRole}
      isOwnProfile={Boolean(data?.isOwnProfile)}
    />
  );
}