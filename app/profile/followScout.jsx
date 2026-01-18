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
    <div>
      {scoutProfiles.map((profile) => (
        <ScoutProfile key={profile.id} profile={profile} />
      ))}
    </div>
    )
}