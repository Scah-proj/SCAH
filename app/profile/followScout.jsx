"use client";
import { User } from "lucide-react";
import ScoutProfile from "../components/ScoutProfile";
import { useGetRecommendedScoutsQuery } from "../redux/api/recommendationApi";

export default function Page() {
  const { data, isLoading, isError } = useGetRecommendedScoutsQuery();

  const recommendations = data?.data?.recommendations || [];

  if (isLoading) {
    return (
      <div className="">
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
          <p className="text-sm text-gray-500">Finding scouts for you...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="">
        <p className="text-center py-16 text-sm text-red-500">
          Failed to load scout suggestions.
        </p>
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="">
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <User className="text-gray-300" size={36} />
          <p className="text-base font-semibold text-gray-900">
            No suggestions yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {recommendations.map((rec) => (
        <div key={rec.target._id || rec.target.userId} className=""> 

          <ScoutProfile profile={rec.target} />
        </div>
      ))}
    </div>
    )
}