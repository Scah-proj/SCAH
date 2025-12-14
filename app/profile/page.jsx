"use client";
import ProfileInfo from "./profileInfo/page";
import ProfileGallery from "./profileGallery/page";
import { useUserStore } from "@/lib/userStore";
import ExperienceSection from "@/app/components/Experience";
import CoreSkillsDisplay from "@/app/components/CoreSkills";
import TechnicalSkillDisplay from "../components/TechnicalSkill";
import AthleteProfileConnect from "./athleteConnect/page";
import ScoutProfileConnect from "./followScout/page";

const Page = () => {
const user = useUserStore((state) => state.user);
const isOwnProfile = true;
  
console.log(user?.technicalSkills)
return(
    <div className="">

        <ProfileInfo />
        <div className="mx-4 flex justify-center items-center">
            <div>

        <ProfileGallery />
        <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
            <p className=" font-semibold text-lg">Experience</p>
            <ExperienceSection experienceList={user?.experienceList || []} isOwnProfile={isOwnProfile} /> 
        </div>
         <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
        <p className=" font-semibold text-lg">Explore Scout Profiles</p>
        <ScoutProfileConnect />
        </div>
        <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">

        <CoreSkillsDisplay 
          coreSkills={user?.coreStrength || []} 
          isOwnProfile={true}
        />
        <TechnicalSkillDisplay
        technicalSkills={user?.technicalSkills || []}
        isOwnProfile={true}
        />
        </div>
        <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
        <p className=" font-semibold text-lg">People you may know</p>
        <AthleteProfileConnect />
        </div>
            </div>
        </div>
    </div>
)
}
export default Page;