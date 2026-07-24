"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

import ProfileInfo from "../profileInfo";
import ProfileGallery from "../profileGallery";
import ExperienceSection from "../../components/Experience";
import CoreSkillsDisplay from "../../components/CoreSkills";
import TechnicalSkillDisplay from "../../components/TechnicalSkill";
import AthleteProfileConnect from "../athleteConnect";
import ScoutProfileConnect from "../followScout";

import { useGetMyProfileQuery } from "../../redux/api/profileApi";

export default function Profile({
  profile: profileProp,
  isOwnProfile = false,
}) {
  const { data: myProfile } = useGetMyProfileQuery(undefined, {
    skip: !isOwnProfile,
  });

  const profile = isOwnProfile
    ? myProfile
    : {
        ...(profileProp?.user || {}),
        ...(profileProp?.profile || {}),

        // Preserve the actual USER id for follow/profile actions
        _id: profileProp?.user?._id,
        userId:
          profileProp?.profile?.userId ||
          profileProp?.user?._id,
      };

  // Both getMyProfile and getPublicProfile now reliably include `role` on
  // the returned profile, so we can trust it directly here regardless of
  // whether this is the logged-in user's own profile or someone else's —
  // no need to cross-reference the separate auth slice.
  const isScout = profile?.role?.toLowerCase() === "scout";

  const connections = isOwnProfile
    ? myProfile?.connections
    : profileProp?.connections;

  const followers = connections?.followers ?? 0;
  const following = connections?.following ?? 0;

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

      {/* <div className="flex justify-center gap-8 py-3 border-y border-gray-200">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {followers}
          </p>
          <p className="text-xs text-gray-500">
            Followers
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {following}
          </p>
          <p className="text-xs text-gray-500">
            Following
          </p>
        </div>
      </div> */}

      <div className="mx-4 flex justify-center items-center">
        <div>
          <ProfileGallery />

          <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
            <p className="font-semibold text-lg">
              Experience
            </p>

            <ExperienceSection
              experienceList={profile?.experience || []}
              isOwnProfile={isOwnProfile}
            />
          </div>

          <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
            <p className="font-semibold text-lg">
              Explore Scout Profiles
            </p>

            <ScoutProfileConnect />
          </div>

          {isScout ? (
            <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
              <p className="font-semibold text-lg">
                Scouting Details
              </p>

              <div className="space-y-3">
                {profile?.organization && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Organization
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.organization}
                    </p>
                  </div>
                )}

                {profile?.currentScoutingLevel && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Current Scouting Level
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.currentScoutingLevel}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.genderFocus && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Preferred Gender
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.genderFocus}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.ageRange && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Age Range
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.ageRange}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.levelOfExperience && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Level of Experience
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.scoutingFocus.levelOfExperience}
                    </p>
                  </div>
                )}

                {profile?.scoutingFocus?.talentCategories?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Talent Categories
                    </p>
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
                    <p className="text-sm text-gray-400">
                      No scouting details added yet.
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
              <p className="font-semibold text-lg">
                Skills &amp; Development
              </p>

              <div className="space-y-3">
                {profile?.coreStrength?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Core Skills
                    </p>
                    <CoreSkillsDisplay
                      coreSkills={profile.coreStrength}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                )}

                {profile?.technicalSkills?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Technical Skills
                    </p>
                    <TechnicalSkillDisplay
                      technicalSkills={profile.technicalSkills}
                      isOwnProfile={isOwnProfile}
                    />
                  </div>
                )}

                {profile?.improvement?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">
                      Areas for Improvement
                    </p>
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

          <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
            <p className="font-semibold text-lg">
              People you may know
            </p>

            <AthleteProfileConnect />
          </div>
        </div>
      </div>
    </div>
  );
}