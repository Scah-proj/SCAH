"use client"
import Trials from "../../../components/trials";

import ScoutProfileConnect from "../../../profile/followScout";
import { useState, useEffect } from "react";
import { getTryout } from "../../lib/tryOuts";
import Link from "next/link";

export default function Suggestions() {
   const [tryOuts, setTryOuts ] = useState([]);
  useEffect(() => {
    async function fetchData(){
      const data = await getTryout();
      console.log("tryouts data:", data);
      setTryOuts(data);
    }
    fetchData();
    
  },[])
 
  return (
    <div className="flex flex-col">
    <div className="rounded-lg">
       <div className="flex justify-between mb-6">
        <p className="font-semibold">Upcoming Trials</p>
        {tryOuts.length > 1 && 
        <Link href="/userfeed/tryOut" className="text-teal-600 font-semibold cursor-pointer">See All</Link>}
     </div>
     <div>
      {tryOuts.slice(0,1).map((trial)=>(
            <Trials key={trial.id} trial={trial}/>
      ))}
     </div>
        </div>
       <div className=" rounded-xl shadow-sm p-4 my-4 space-y-1">
              <p className=" font-semibold text-lg">Trusted Scout on SCAH</p>
              <p className="text-sm text-gray-500">Based on your location and distance</p>
              <ScoutProfileConnect />
              </div>
    </div>
  );
}    