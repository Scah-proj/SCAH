"use client"
import Trials from "../../../components/trials";
import ScoutProfileConnect from "../../../profile/followScout";
import { useGetLatestTryoutQuery } from "../../../redux/api/tryoutApi";
import Link from "next/link";

export default function Suggestions() {
  const { data: tryout, isLoading, isError } = useGetLatestTryoutQuery();

  return (
    <div className="flex flex-col">
    <div className="rounded-lg">
       <div className="flex justify-between mb-6">
        <p className="font-semibold">Upcoming Trials</p>
        <Link href="/userfeed/tryOut" className="text-teal-600 font-semibold cursor-pointer">See All</Link>
     </div>
     <div>
      {isLoading && <p className="text-sm text-gray-500">Loading trials...</p>}
      {isError && <p className="text-sm text-red-600">Failed to load trials.</p>}
      {tryout && <Trials key={tryout._id} trial={tryout}/>}
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