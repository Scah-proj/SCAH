"use client";
import { MdEdit } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { useUserStore } from "../../lib/userStore";

function ExperienceCard({ exp, isEditable, index }) {
  return (
    <div className="flex gap-4 items-start">
      
      {/* Image / Placeholder */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
        {exp.Academy?.[0] || "?"}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-900">
            {exp.Academy}
          </h3>

          {isEditable && (
            <div className="flex gap-2">
              <MdEdit size={16} className="text-gray-500 cursor-pointer" />
              <IoTrash size={16} className="text-red-500 cursor-pointer" />
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-0.5">
          {exp.primarySport}
          {exp.athletePosition && ` · ${exp.athletePosition}`}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {formatDate(exp.start)} – {formatDate(exp.end)}
        </p>
      </div>
    </div>
  );
}


function formatDate(dateString) {
  if (!dateString || dateString === "Present") return dateString;
  
  const date = new Date(dateString);
  // const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${month} ${year}`;
}

export default function ExperienceSection({ experienceList = [], mode = "view", isOwnProfile }) {
  const isEditable = mode === "edit";

  if (!experienceList.length) {
    return (
      <div className="my-4 p-6 rounded-md text-center text-gray-500">
        <p>No Experience added yet</p>
        {isOwnProfile && (
          <p className="text-sm mt-2">Add Experience in Edit Profile</p>
        )}
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {experienceList.map((exp, index) => (
        <ExperienceCard
          key={index}
          exp={exp}
          isEditable={isEditable}
          index={index}
        />
      ))}
    </section>
  );
}
