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

export default function ProfileInfo({ profile, isOwnProfile }) {
  const router = useRouter();

  const [bio] = useState("");

  const profileId = profile?._id || profile?.id;

  const { data: connectionStatus, refetch } =
    useGetConnectionStatusQuery(profileId, {
      skip: isOwnProfile || !profileId,
    });

  const [followUser, { isLoading: isFollowLoading }] =
    useFollowUserMutation();

  const [updateProfile, { isLoading: isUploading }] =
    useUpdateProfileMutation();

  const following =
    connectionStatus?.data?.isFollowing ??
    connectionStatus?.isFollowing ??
    false;

  const handleFollow = async () => {
    if (!profileId || following) return;

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

  const handleEdit = () => {
    router.push("/profile/editBio");
  };

  return (
    <div className="mb-6">
      <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
        <div className="relative">
          <div className="relative">
            <Image
              src={profile?.coverPhoto || "/defaultCover.jpg"}
              alt="Cover Photo"
              width={1200}
              height={300}
              className="w-full h-40 md:h-60 object-cover"
            />
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
              <Label className="absolute left-[12%] bottom-24 border bg-white rounded-full cursor-pointer hover:bg-gray-100">
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
        <div className="flex flex-row justify-between mt-16">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl text-black break-all">
              {profile?.name}
            </p>

            <p className="font-medium text-sm text-gray-800">
              {profile?.club}
            </p>

            <p className="text-xs text-gray-500">
              {profile?.location?.state}, {profile?.location?.country}
            </p>
          </div>

          <div>
            {isOwnProfile ? (
              <Link href="/profile/editProfile">
                <button className="border rounded-sm py-2 text-white px-5 bg-teal-600 hover:bg-teal-700">
                  Edit Profile
                </button>
              </Link>
            ) : (
              <button
                onClick={handleFollow}
                disabled={isFollowLoading || following}
                className={`rounded-sm py-2 px-5 font-medium transition-all ${
                  following
                    ? "bg-teal-600 text-white cursor-default"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                } ${
                  isFollowLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isFollowLoading
                  ? "Following..."
                  : following
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div className="py-2 flex">
          {profile?.bio ? (
            <p className="p-2 rounded-md bg-gray-100">
              {profile.bio}
            </p>
          ) : (
            isOwnProfile && (
              <div
                onClick={handleEdit}
                className="border p-2 rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-2"
              >
                <MdEdit size={16} />
                <p className="font-medium">Add Bio</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}