"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import { BiFootball, BiBasketball } from "react-icons/bi";
import { CiFootball } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";

export default function Trials({ trial }) {
  const sportConfig = {
    football: {
      bg: "bg-teal-800/80",
      Icon: BiFootball,
    },
    basketball: {
      bg: "bg-orange-400/80",
      Icon: BiBasketball,
    },
    soccer: {
      bg: "bg-lime-600/80",
      Icon: CiFootball,
    },
  };

  const sportKey = trial?.sport?.toLowerCase();

  const sport = sportConfig[sportKey] || {
    bg: "bg-gray-500/50",
    Icon: null,
  };

  function getDeadlineStatus(deadline) {
    const today = new Date();
    const end = new Date(deadline);

    const diffTime = end - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft < 0)
      return { text: "Closed", color: "text-gray-500 bg-gray-100" };

    if (daysLeft === 0)
      return { text: "Ends Today", color: "text-red-600 bg-red-50" };

    if (daysLeft <= 3)
      return {
        text: `${daysLeft} days left`,
        color: "text-red-600 bg-red-50",
      };

    if (daysLeft <= 7)
      return {
        text: `${daysLeft} days left`,
        color: "text-orange-600 bg-orange-50",
      };

    return {
      text: `${daysLeft} days left`,
      color: "text-green-600 bg-green-50",
    };
  }

  // Backend returns postedBy instead of scout
  const scout = trial?.postedBy;

  const scoutName = scout
    ? `${scout.firstName || ""} ${scout.lastName || ""}`.trim()
    : "Unknown";

  const deadlineInfo = getDeadlineStatus(trial?.deadline);

  return (
    <div className="mb-4">
      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm hover:shadow-md transition">
        {/* Sport */}
        <div className="flex">
          <span
            className={`flex items-center justify-center gap-1 rounded-full text-xs font-semibold whitespace-nowrap transition px-2 py-1 text-white mb-2 ${sport.bg}`}
          >
            {sport.Icon && <sport.Icon size={14} />}
            <span className="mx-1">{trial?.sport}</span>
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center shrink-0">
              {trial?.badge ? (
                <Image
                  src={trial.badge}
                  alt="Tryout"
                  width={34}
                  height={34}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Users className="w-4 h-4 text-gray-500" />
              )}
            </span>

            <div>
              <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                {trial?.title}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            <MapPin className="inline-block mr-1 mb-1 w-4 h-4 text-gray-400" />
            {trial?.venue}, {trial?.city}
          </p>

          <p
            className={`mt-2 px-3 py-2 rounded-md text-xs font-medium inline-block ${deadlineInfo.color}`}
          >
            {deadlineInfo.text} ·{" "}
            {trial?.deadline ? new Date(trial.deadline).toLocaleDateString() : ""}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href={`/userfeed/tryout/application/${trial?._id}`}
            className="w-full max-w-sm bg-teal-600 text-white font-medium text-sm flex justify-center py-2.5 rounded-lg hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            View Details
          </Link>
        </div>

        <div>
          <span className="text-xs text-gray-500 my-1">
            Posted by: {scoutName}
          </span>
        </div>
      </div>
    </div>
  );
}