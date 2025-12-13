"use client";
import ProfileInfo from "./profileInfo/page";
import ProfileGallery from "./profileGallery/page";
import { useUserStore } from "@/lib/userStore";
import ExperienceSection from "@/app/components/Experience";
import CoreSkillsDisplay from "@/app/components/CoreSkills";
import TechnicalSkillDisplay from "../components/TechnicalSkill";

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
        <div className="border border-gray-200 py-2">
            <p className="px-4 font-semiboldtext-lg">Experience</p>
            <ExperienceSection experienceList={user?.experienceList || []} isOwnProfile={isOwnProfile} /> 
        </div>
        <CoreSkillsDisplay 
          coreSkills={user?.coreStrength || []} 
          isOwnProfile={true}
        />
        <TechnicalSkillDisplay
        technicalSkills={user?.technicalSkills || []}
        isOwnProfile={true}
        />
            </div>
        </div>
    </div>
)
}
export default Page;