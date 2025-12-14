import { useState, useEffect } from "react";
import { getProfiles } from "../../userfeed/lib/profile";
import AthleteProfile from "@/app/components/AthleteProfile";

export default function AthleteProfileConnect() {
     const [profile, setProfile] = useState([]);
        
          useEffect(() => {
            async function fetchData() {
              const data = await getProfiles();
              setProfile(data);
            }
            fetchData();
          }, []);

           const athleteProfiles = profile.filter(
    (profile) => profile.role === "Athlete"
  );

  return (
    <div>
      {athleteProfiles.map((profile) => (
        <AthleteProfile key={profile.id} profile={profile} />
      ))}
    </div>
    )
}