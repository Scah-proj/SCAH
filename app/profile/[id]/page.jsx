"use client";

import { use } from "react";
import { Loader } from "lucide-react";
import Profile from "../profile/page";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";
import {
  useGetMyPostsQuery,
  useGetProfileFeedQuery,
} from "../../redux/api/feedApi";

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

  // 1. Fetch public profile data first
  const {
    data,
    isLoading: isLoadingProfile,
    isError,
  } = useGetPublicProfileQuery(id, {
    skip: !id,
  });

  const isOwnProfile = Boolean(data?.isOwnProfile);
  
  // Extract target User ID safely once data is available
  const targetUserId = data?.user?._id || data?.profile?.userId || id;

  // 2. Fetch "My Posts" ONLY if profile is loaded AND it's strictly own profile
  const { data: myPostsData, isLoading: isLoadingMyPosts } = useGetMyPostsQuery(
    undefined,
    {
      skip: !data || !isOwnProfile,
    }
  );

  // 3. Fetch user feed ONLY if profile is loaded AND it's another user's profile
  const { data: profileFeedData, isLoading: isLoadingProfileFeed } =
    useGetProfileFeedQuery(targetUserId, {
      skip: !data || isOwnProfile || !targetUserId,
    });

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader className="h-6 w-6 animate-spin text-teal-600" />
        <p className="text-sm text-gray-500 font-medium">Loading profile...</p>
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

  // Extract posts based on profile ownership
  const posts = isOwnProfile
    ? myPostsData?.data?.posts || myPostsData?.data || myPostsData?.posts || []
    : profileFeedData?.data?.posts || profileFeedData?.data || profileFeedData?.posts || [];

  const isLoadingPosts = isOwnProfile ? isLoadingMyPosts : isLoadingProfileFeed;

  const profileWithRole = {
    ...data,
    profile: {
      ...data?.profile,
      role: inferRole(data?.profile),
      userId: targetUserId,
    },
  };

  return (
    <Profile
      profile={profileWithRole}
      isOwnProfile={isOwnProfile}
      posts={posts}
      isLoadingPosts={isLoadingPosts}
    />
  );
}