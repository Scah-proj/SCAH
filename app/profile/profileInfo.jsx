"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";

import {
  useFollowUserMutation,
  useGetConnectionStatusQuery,
} from "../redux/api/connectionApi";

import { useUpdateProfileMutation } from "../redux/api/profileApi";

export default function ProfileInfo({ profile, isOwnProfile, followers, following }) {
  const router = useRouter();

  const [bio] = useState("");

  const profileId = profile?._id || profile?.id;
  const displayName =
  profile?.name ||
  `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();

  const { data: connectionStatus, refetch } =
    useGetConnectionStatusQuery(profileId, {
      skip: isOwnProfile || !profileId,
    });

  const [followUser, { isLoading: isFollowLoading }] =
    useFollowUserMutation();

  const [updateProfile, { isLoading: isUploading }] =
    useUpdateProfileMutation();

  const isFollowing =
    connectionStatus?.data?.isFollowing ??
    connectionStatus?.isFollowing ??
    false;

  const handleFollow = async () => {
    if (!profileId || isFollowing) return;

    try {
      await followUser(profileId).unwrap();
      refetch();
    } catch (err) {
      console.error("Follow failed:", err);
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateProfile({
        profilePicture: file,
      }).unwrap();

      router.refresh();
    } catch (err) {
      console.error("Profile picture upload failed:", err);
    }
  };
  const handleCoverPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateProfile({
        coverPhoto: file,
      }).unwrap();

      router.refresh();
    } catch (err) {
      console.error("Cover photo upload failed:", err);
    }
  };

  const handleEdit = () => {
    router.push("/profile/editBio");
  };

  return (
    <div className="mb-6">
      <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
        <div className="relative">
          <div className="relative">
            <Image
              src={profile?.coverPhoto || "/defaultCover.png"}
              alt="Cover Photo"
              width={1200}
              height={300}
              className="w-full h-40 md:h-60 object-cover"
            />
            {isOwnProfile && (
              <Label className="absolute right-[2%] bottom-2 border bg-white rounded-full cursor-pointer hover:bg-gray-100">
                {isUploading ? (
                  <span className="px-2 py-1 text-xs">...</span>
                ) : (
                  <MdEdit size={16} className="m-2" />
                )}

                <input
                  type="file"
                  name="editCoverPhoto"
                  id="editCoverPhoto"
                  accept="image/*"
                  disabled={isUploading}
                  className="hidden"
                  onChange={handleCoverPhotoUpload}
                />
              </Label>
            )}
          </div>

          <div className="relative">
            <Image
              src={profile?.profilePicture || "/defaultImage.jpg"}
              alt="Profile Picture"
              width={250}
              height={250}
              className="w-20 !h-20 md:w-48 md:!h-48 object-cover rounded-full absolute bottom-[-60px] left-4 border-4 border-white"
            />

            {isOwnProfile && (
              <Label className="absolute bottom-[-55px] left-[70px] md:left-[165px] bg-white border rounded-full p-2 cursor-pointer hover:bg-gray-100 shadow">
                {isUploading ? (
                  <span className="px-2 py-1 text-xs">...</span>
                ) : (
                  <MdEdit size={16} className="m-2" />
                )}

                <input
                  type="file"
                  name="editProfilePic"
                  id="editProfilePic"
                  accept="image/*"
                  disabled={isUploading}
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </Label>
            )}
          </div>
        </div>
      </div>

      <div className="px-6">
<div className="mt-16 flex flex-col md:flex-row md:justify-between gap-3">
            <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl text-black break-all">
   {profile?.name ||
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()}
</p>

            <p className="font-medium text-sm text-gray-800">
              {profile?.club}
            </p>

            <p className="text-xs text-gray-500">
              {profile?.location?.state}, {profile?.location?.country}
            </p>
          </div>

        </div>
<div className="mt-6 flex items-start justify-between gap-4 flex-wrap">  {/* Left */}
  <div className="flex flex-col sm:flex-row gap-3">
    {profile?.bio ? (
      <p className="text-sm text-gray-600 max-w-full md:max-w-md">
        {profile.bio}
      </p>
    ) : (
      isOwnProfile && (
        <button
          onClick={handleEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <MdEdit size={16} />
          Add Bio
        </button>
      )
    )}

    {isOwnProfile ? (
      <Link href="/profile/editProfile">
        <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 w-full sm:w-auto text-sm font-medium text-white hover:bg-teal-700 transition">
          <MdEdit size={16} />
          Edit Profile
        </button>
      </Link>
    ) : (
      <button
        onClick={handleFollow}
        disabled={isFollowLoading || isFollowing}
        className={`rounded-lg px-5 py-2.5 w-full sm:w-auto text-sm font-medium transition ${
          isFollowing
            ? "bg-teal-600 text-white"
            : "bg-teal-600 hover:bg-teal-700 text-white"
        } ${
          isFollowLoading
            ? "opacity-70 cursor-not-allowed"
            : ""
        }`}
      >
        {isFollowLoading
          ? "Following..."
          : isFollowing
          ? "Following"
          : "Follow"}
      </button>
    )}
  </div>

  {/* Right */}
  <div className="flex items-center gap-6 md:gap-10">
    <div className="text-center">
      <p className="text-xl md:text-2xl font-bold text-gray-900">
        {followers}
      </p>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Followers
      </p>
    </div>

    <div className="text-center">
      <p className="text-xl md:text-2xl font-bold text-gray-900">
        {following}
      </p>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Following
      </p>
    </div>
  </div>

</div>
        
      </div>
    </div>
  );
}