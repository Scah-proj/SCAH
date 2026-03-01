"use client";
import { useState, useEffect } from "react";
import { getProfiles } from "../userfeed/lib/profile";
import ScoutProfile from "../components/ScoutProfile";

export default function Page() {
     const [profile, setProfile] = useState([]);
        
          useEffect(() => {
            async function fetchData() {
              const data = await getProfiles();
              setProfile(data);
            }
            fetchData();
          }, []);

           const scoutProfiles = profile.filter(
    (profile) => profile.role === "Scout"
  );

  return (
    <div className="">
      {scoutProfiles.map((profile) => (
        <div key={profile.id} className=""> 

          <ScoutProfile key={profile.id} profile={profile} />
        </div>
      ))}
    </div>
    )
}