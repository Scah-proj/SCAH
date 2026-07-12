"use client";
import Profile from "../profile/page";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";

export default function Page({ params }) {
  const { id } = params;

  const { data: profile, isLoading, isError } = useGetPublicProfileQuery(id);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-6 text-center text-red-500">Profile not found.</div>
    );
  }

  return (
    <div className="">
      <Profile profile={profile} isOwnProfile={false} />
    </div>
  );
}