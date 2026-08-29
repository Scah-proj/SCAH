"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar, MapPin, Users, Bookmark } from "lucide-react";
import { BiFootball, BiBasketball } from "react-icons/bi";
import { CiFootball } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";

import { useToggleSaveTryoutMutation } from "../redux/api/tryoutApi"; // Adjust path if needed
import {
  setSaving,
  setSaveSuccess,
  setSaveError,
  updateTryoutSavedState,
} from "../redux/features/tryout/tryoutSlice"; 

export default function Trials({ trial }) {
  const dispatch = useDispatch();
  const [toggleSaveTryout] = useToggleSaveTryoutMutation();
  const [saved, setSaved] = useState(!!trial?.isSaved);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaving || !trial?._id) return;

    const previousSaved = saved;
    setSaved((prev) => !prev); // optimistic update
    setIsSaving(true);

    dispatch(setSaving(true));
    dispatch(setSaveError(null));
    dispatch(setSaveSuccess(false));

    try {
      const res = await toggleSaveTryout(trial._id).unwrap();
      const nextSaved = res?.data?.saved ?? !previousSaved;
      const nextCount = res?.data?.count;

      setSaved(nextSaved);

      dispatch(setSaveSuccess(true));
      dispatch(
        updateTryoutSavedState({
          tryoutId: trial._id,
          saved: nextSaved,
          count: nextCount,
        })
      );
    } catch (err) {
      setSaved(previousSaved); // rollback on failure
      console.error("Failed to toggle saved tryout:", err);

      const message =
        err?.data?.message ||
        err?.data?.error ||
        err?.message ||
        "Failed to save tryout";
      dispatch(setSaveError(message));
    } finally {
      setIsSaving(false);
      dispatch(setSaving(false));
    }
  };

  return (
    <div className="mb-4">
      <div className="relative bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">

        {/* Sport */}
        <div className="flex">
          <span
            className={`flex items-center justify-center gap-1 rounded-full text-xs font-semibold whitespace-nowrap transition px-2 py-1 text-white mb-2 ${sport.bg}`}
          >
            {sport.Icon && <sport.Icon size={14} />}
            <span className="mx-1">{trial?.sport}</span>
          </span>
        </div>

                {/* Bookmark */}

        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          aria-label={saved ? "Remove from saved" : "Save tryout"}
          className="p-1.5 rounded-full bg-white/80 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Bookmark
            size={18}
            className={`transition ${
              saved
                ? "fill-teal-600 text-teal-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          />
        </button>
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
              <p className="font-semibold text-gray-900 text-sm line-clamp-2 pr-6">
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
            className="w-full max-w-sm bg-teal-600 text-white font-semibold text-sm flex justify-center py-2.5 rounded-lg hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
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