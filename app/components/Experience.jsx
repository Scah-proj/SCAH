"use client";
import { MdEdit } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { useUserStore } from "@/lib/userStore";

export default function ExperienceSection ({experienceList, isOwnProfile = false}) {
    const user = useUserStore((state) => state.user);
    const handleDeleteExperience = (index) => {
      const allExperience = user?.experienceList || [];
      const updatedList = allExperience.filter((_, i) => i !== index);
      useUserStore.getState().updateProfile({ experienceList: updatedList });
    };
    
     if (!experienceList || experienceList.length === 0) {
    return (
      <div className="my-4 p-6 border border-gray-200 rounded-md text-center text-gray-500">
        <p>No experience added yet</p>
        {isOwnProfile && (
          <p className="text-sm mt-2">Add your experience in Edit Profile</p>
        )}
      </div>
    );
  }

  return(
    <div>
      {experienceList.map((exp, index) => (
        <div key={index} className="py-2 px-4 rounded-md">
          <div className="flex items-center text-xs  gap-2 text-gray-500">
            <p>
              Played
            </p>
            {exp.primarySport && (
            <p className="">{exp.primarySport}</p>
          )}
          <p>@</p>
          </div>
          <div className="flex justify-between items-center"> 
          <div className="font-semibold text-lg flex ">
          <h3 className="">{exp.Academy}</h3>
          </div>
         { isOwnProfile && (
             <div className="flex gap-2">

          <MdEdit size={16} className="text-gray-500 cursor-pointer"/>
          <IoTrash size={16} className="text-red-500 cursor-pointer" onClick={() => handleDeleteExperience(index)}/>
          </div>
         )}
          </div>
          <div className="flex items-center gap-3 text-sm mb-1">
          {exp.athletePosition && (
            <p>{exp.athletePosition}</p>
          )}
          <p className="text-gray-600">
            {formatDate(exp.start)} - {formatDate(exp.end)}
          </p>
          </div>
          
        </div>
      ))}
    </div>
  )
}
function formatDate(dateString) {
  if (!dateString || dateString === "Present") return dateString;
  
  const date = new Date(dateString);
  // const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${month} '${year}`;
}