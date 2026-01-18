"use client"
import ProfileInfo from "../profileInfo";
import ProfileGallery from "../profileGallery"
// import { useState, useEffect } from "react";
import ExperienceSection from "../../../components/Experience";
import CoreSkillsDisplay from "../../../components/CoreSkills";
import TechnicalSkillDisplay from "../../../components/TechnicalSkill";
import AthleteProfileConnect from "../../athleteConnect";
import ScoutProfileConnect from "../../followScout";
import { useUserStore } from "../../../../lib/userStore"
export default function Profile({profile}){

    const { user } = useUserStore();

    // const isOwnProfile = user?.id === profile?.id;
        const isOwnProfile = true;

    return(
        <div>
             <ProfileInfo profile={profile} isOwnProfile={isOwnProfile} />
        <div className="mx-4 flex justify-center items-center">
            <div>

        <ProfileGallery />
        <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
            <p className=" font-semibold text-lg">Experience</p>
            <ExperienceSection experienceList={profile?.experienceList || []} isOwnProfile={isOwnProfile} /> 
        </div>
         <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
        <p className=" font-semibold text-lg">Explore Scout Profiles</p>
        <ScoutProfileConnect />
        </div>
        <div className="border border-gray-200 rounded-xl shadow-sm p-4 my-4 space-y-4">
        <div>
        <p className=" font-semibold text-lg">Core Skills</p>
        <CoreSkillsDisplay 
          coreSkills={profile?.coreStrength || []} 
        isOwnProfile={isOwnProfile}        />
        </div>
        <div>
        <p className=" font-semibold text-lg">Technical Skills</p>
        <TechnicalSkillDisplay
        technicalSkills={profile?.technicalSkills || []}
        isOwnProfile={isOwnProfile}
        />
        </div>
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