"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowBack, MdClose, MdPersonAdd } from "react-icons/md";
import { User, Loader, FolderOpen } from "lucide-react";
import NothingToSee from "../../components/NothingToSee";
import ProfileInfo from "../profileInfo";
import ProfileGallery from "../profileGallery";
import ExperienceSection from "../../components/Experience";
import CoreSkillsDisplay from "../../components/CoreSkills";
import TechnicalSkillDisplay from "../../components/TechnicalSkill";
import ScoutProfileConnect from "../followScout";

import { useGetMyProfileQuery } from "../../redux/api/profileApi";
import { useGetMyPostsQuery } from "../../redux/api/feedApi";
import {
  useGetPeopleYouMayKnowQuery,
  useDismissSuggestionMutation,
} from "../../redux/api/recommendationApi";

export default function Profile({
  profile: profileProp,
  isOwnProfile = false,
  posts: passedPosts,
  isLoadingPosts: passedLoading,
}) {
  const [showNoDataModal, setShowNoDataModal] = useState(false);

  const { data: myProfile } = useGetMyProfileQuery(undefined, {
    skip: !isOwnProfile,
  });

  const { data: myPostsData, isLoading: isLoadingMyPosts } = useGetMyPostsQuery(
    undefined,
    {
      skip: !isOwnProfile || Boolean(passedPosts),
    }
  );

  // Skip fetching suggestions if it's not the user's own profile
  const { data: recommendationsData, isLoading: isLoadingPeople } =
    useGetPeopleYouMayKnowQuery(
      { limit: 6 },
      { skip: !isOwnProfile }
    );
  const [dismissSuggestion] = useDismissSuggestionMutation();

  // Safely extract suggestions from nested payload shapes
  const peopleYouMayKnow = Array.isArray(recommendationsData)
    ? recommendationsData
    : recommendationsData?.data?.suggestions ||
      recommendationsData?.suggestions ||
      recommendationsData?.data?.users ||
      recommendationsData?.data ||
      [];

  // Resolve posts and loading states
  const posts =
    passedPosts ??
    (myPostsData?.data?.posts || myPostsData?.data || myPostsData?.posts || []);
  const isLoadingPosts = passedLoading ?? isLoadingMyPosts;

  // Open No Data Modal when posts fetch completes and array is empty
  useEffect(() => {
    if (!isLoadingPosts && (!posts || posts.length === 0)) {
      setShowNoDataModal(true);
    }
  }, [isLoadingPosts, posts]);

  const profile = isOwnProfile
    ? myProfile
    : {
        ...(profileProp?.user || {}),
        ...(profileProp?.profile || {}),

        _id: profileProp?.user?._id || profileProp?.profile?.userId,
        userId:
          profileProp?.profile?.userId || profileProp?.user?._id,
      };

  const isScout = profile?.role?.toLowerCase() === "scout";

  const connections = isOwnProfile
    ? myProfile?.connections
    : profileProp?.connections;

  const followers = connections?.followers ?? 0;
  const following = connections?.following ?? 0;

  const handleDismiss = async (userId) => {
    try {
      await dismissSuggestion(userId).unwrap();
    } catch (error) {
      console.error("Failed to dismiss user:", error);
    }
  };

  const targetUserId = profile?._id || profile?.userId;

  return (
    <div>
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 z-20 flex items-center justify-between px-4">
        <Link href="/userfeed">
          <MdArrowBack size={26} />
        </Link>
      </div>

      <ProfileInfo
        profile={profile}
        isOwnProfile={isOwnProfile}
        followers={followers}
        following={following}
      />

      <div className="mx-4 flex justify-center items-center">
        <div>
          {/* Gallery Posts & View All Posts Button */}
          <div className="space-y-3 my-4 relative">
            {isLoadingPosts ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <Loader className="w-8 h-8 text-teal-600 animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Loading posts...</p>
              </div>
            ) : (
              <>
                <ProfileGallery posts={posts} isLoading={isLoadingPosts} />
                {posts.length > 6 && (
                  <div className="flex justify-center">
                    <Link
                      href={`/profile/profile/${targetUserId}/allPosts`}
                      className="w-full text-center py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors block"
                    >
                      View All Posts
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Experience Section */}
          <div className="rounded-xl p-4 my-4 space-y-4">
            <h3 className="font-semibold text-lg">Experience</h3>

            <ExperienceSection
              experienceList={profile?.experience || []}
              isOwnProfile={isOwnProfile}
            />
          </div>

          {/* Explore Scout Profiles - Only show if own profile and not a scout */}
          {isOwnProfile && !isScout && (
            <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
              <h3 className="font-semibold text-lg">Explore Scout Profiles</h3>

              <ScoutProfileConnect />
            </div>
          )}

          {isScout ? (
            <div>
              <h3 className="font-semibold text-lg">Scouting Details</h3>

            <div className="border border-dashed border-gray-300 rounded-xl shadow-sm p-4 my-4 space-y-4">

              <div className="space-y-3">
                {profile?.organization && (
                  <div>
                    <p className="text-xs text-gray-500">Organization</p>
                    <p className="text-sm text-gray-900">{profile.organization}</p>
                  </div>
                )}

                {profile?.currentScoutingLevel && (
                  <div>
                    <p className="text-xs text-gray-500">Current Scouting Level</p>
                    <p className="text-sm text-gray-900">
                      {profile.currentScoutingLevel}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.genderFocus && (
                  <div>
                    <p className="text-xs text-gray-500">Preferred Gender</p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.genderFocus}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.ageRange && (
                  <div>
                    <p className="text-xs text-gray-500">Age Range</p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.ageRange}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.levelOfExperience && (
                  <div>
                    <p className="text-xs text-gray-500">Level of Experience</p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.levelOfExperience}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.talentCategories?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Talent Categories</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.scoutingFocus.talentCategories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!profile?.organization &&
                  !profile?.currentScoutingLevel &&
                  !profile?.scoutingFocus?.genderFocus &&
                  !profile?.scoutingFocus?.ageRange &&
                  !profile?.scoutingFocus?.levelOfExperience &&
                  !profile?.scoutingFocus?.talentCategories?.length && (
                    <p className="text-lg text-center text-gray-500">
                      No scouting details added yet.
                    </p>
                    
                  )}
                  {isOwnProfile && (
                            <p className="text-xs text-center text-gray-500 mt-2">
                              Add details in <Link href="/profile/editProfile" className="text-teal-500">Edit Profile</Link>.
                            </p>
                          )}
              </div>
            </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
              <p className="font-semibold text-lg">Skills &amp; Development</p>

              <div className="space-y-3">
                {profile?.coreStrength?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Core Skills</p>
                    <CoreSkillsDisplay
                      coreSkills={profile.coreStrength}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                )}

                {profile?.technicalSkills?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Technical Skills</p>
                    <TechnicalSkillDisplay
                      technicalSkills={profile.technicalSkills}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                )}

                {profile?.improvement?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Areas for Improvement</p>
                    <TechnicalSkillDisplay
                      technicalSkills={profile.improvement}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                )}

                {!profile?.coreStrength?.length &&
                  !profile?.technicalSkills?.length &&
                  !profile?.improvement?.length && (
                    <p className="text-sm text-gray-400">
                      No skills added yet.
                    </p>
                  )}
              </div>
            </div>
          )}

          {/* Integrated "People You May Know" Section - Only show on own profile */}
          {isOwnProfile && (
            <div>
              <h3 className="font-semibold text-lg">People you may know</h3>
            <div className="p-4 my-4 space-y-4">

              {isLoadingPeople ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="animate-pulse flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-24" />
                          <div className="h-3 bg-gray-200 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : peopleYouMayKnow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {peopleYouMayKnow.map((item, index) => {
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
                        className="relative border border-gray-100 rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow bg-white"
                      >
                        <button
                          onClick={() => handleDismiss(id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Dismiss suggestion"
                        >
                          <MdClose size={18} />
                        </button>

                        <Link
                          href={`/profile/${id}`}
                          className="flex items-center space-x-3 pr-6"
                        >
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt={name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover w-12 h-12"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200 shrink-0">
                              <User className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm text-gray-900 line-clamp-1">
                              {name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {subTitle}
                            </p>
                          </div>
                        </Link>

                        <Link
                          href={`/profile/${id}`}
                          className="p-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-full transition-colors"
                          title="Connect"
                        >
                          <MdPersonAdd size={20} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No new suggestions right now.
                </p>
              )}
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom No Data Modal */}
      {showNoDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowNoDataModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
            >
              <MdClose size={20} />
            </button>
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <NothingToSee
                title="No Posts Available"
                description={isOwnProfile
                  ? "You haven't uploaded any posts yet."
                  : "This profile does not have any published posts yet."}
              />
            </div>
           
            <button
              onClick={() => setShowNoDataModal(false)}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}