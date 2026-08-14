"use client";

import MyTryoutCard from "../../../components/manage";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useGetMyTryoutsQuery } from "../../../redux/api/tryoutApi";

export default function ManageTryouts() {
  const { data, isLoading, isError, error } = useGetMyTryoutsQuery();

  const tryouts = (data?.data?.tryouts || []).map((t) => ({
    _id: t._id,
    id: t._id,
    title: t.title,
    sport: t.sport,
    level: t.level,
    city: t.city,
    status: t.isActive ? "Open" : "Closed",
    applicants: t.applicantsCount ?? 0,
    deadline: t.deadline,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div>
        <Link
          href="/userfeed/tryout"
          className="flex items-center text-gray-500 hover:text-black mb-4"
        >
          <MdArrowBack />
          <span className="ml-2">Back to Tryout</span>
        </Link>
      </div>

      <div className="space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Manage Tryouts
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your posted tryouts and review applicants.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader className="h-6 w-6 animate-spin text-teal-600" />
            <p className="text-gray-500 text-sm">Loading your tryouts...</p>
          </div>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center py-12">
          {error?.data?.message || error?.message || "Failed to load your tryouts."}
        </p>
      ) : tryouts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          You haven&apos;t posted any tryouts yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tryouts.map((item) => (
            <MyTryoutCard
              key={item.id}
              trial={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}