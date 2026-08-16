"use client";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { IoTrash } from "react-icons/io5";

function isScoutExperience(exp) {
  return exp && typeof exp === "object" && "organization" in exp;
}

function ExperienceCard({ exp, isEditable }) {
  const isScout = isScoutExperience(exp);

  const title = isScout
    ? exp.organization || "Unknown Organization"
    : exp.clubName || "Unknown Club";

  const subtitleParts = isScout
    ? [
        exp.rolePosition,
        exp.yearsOfExperience != null && exp.yearsOfExperience !== ""
          ? `${exp.yearsOfExperience} yr${exp.yearsOfExperience === 1 ? "" : "s"} experience`
          : null,
        exp.location,
      ].filter(Boolean)
    : [exp.sport, exp.position].filter(Boolean);

  const description = isScout ? exp.notableTalents : exp.description;

  // Scout's experience schema has no "currentlyPlaying"/ongoing concept —
  // only Athlete's does.
  const isOngoing = !isScout && exp.currentlyPlaying;

  return (
    <div className="flex gap-4 items-start rounded-lg border border-gray-200 p-4">
      {/* Initial */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-lg flex-shrink-0">
        {title.charAt(0).toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-900">
            {title}
          </h3>

          {isEditable && (
            <div className="flex gap-2">
              <button type="button">
                <MdEdit
                  size={18}
                  className="text-gray-500 hover:text-teal-600 cursor-pointer"
                />
              </button>

              <button type="button">
                <IoTrash
                  size={18}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                />
              </button>
            </div>
          )}
        </div>

        {subtitleParts.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {subtitleParts.join(" • ")}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          {formatDate(exp.startDate)} —{" "}
          {isOngoing ? "Present" : formatDate(exp.endDate)}
        </p>

        {description && (
          <p className="text-sm text-gray-700 mt-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceSection({
  experienceList = [],
  mode = "view",
  isOwnProfile = false,
}) {
  const isEditable = mode === "edit";

  if (!experienceList || experienceList.length === 0) {
    return (
      <div className="my-4 rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        <p className="text-lg">No experience added yet.</p>

        {isOwnProfile && (
          <p className="text-xs mt-2">
            Add experience in <Link href="/profile/editProfile" className="text-teal-500">Edit Profile</Link>.
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {experienceList.map((exp, index) => (
        <ExperienceCard
          key={exp._id || index}
          exp={exp}
          isEditable={isEditable}
        />
      ))}
    </section>
  );
}