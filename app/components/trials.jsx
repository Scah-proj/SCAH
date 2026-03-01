"use client"
import { Calendar, MapPin, Users, } from "lucide-react";
import { BiFootball, BiBasketball  } from "react-icons/bi";
import { CiFootball } from "react-icons/ci";


import Link from "next/link";

export default function Trials({trial}) {
  const sportConfig = {
  football: {
    bg: "bg-teal-800/40",
    Icon: BiFootball,
  },
 
  basketball: {
    bg: "bg-orange-400/50",
    Icon: BiBasketball,
  },
  soccer: {
    bg: "bg-lime-600/50",
    Icon: CiFootball,
  },

 
}

const sportKey = trial.sport?.toLowerCase()

const sport = sportConfig[sportKey] || {
  bg: "bg-gray-500/50",
  Icon: null,
}
 const scout = trial.scout
  return (
     <div className="max-w-md mx-auto mb-4">
    

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
        
        {/* Trial Info */}
       
       <div className="flex">
  <span
    className={`flex items-center justify-center gap-1 rounded-full text-sm font-medium whitespace-nowrap transition px-2 py-1 text-white mb-2 ${sport.bg}`}
  >
    {sport.Icon && <sport.Icon size={14} />}
    <span className="mx-1">
    {trial.sport}
    </span>
  </span>
</div>
        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-900">
            {trial.title}
          </p>

          <p className="text-sm text-gray-500">
            <Calendar className="inline-block mr-1 mb-1 w-4 h-4 text-gray-400" />
            {trial.date}
          </p>

          <p className="text-sm text-gray-500">
            <MapPin className="inline-block mr-1 mb-1 w-4 h-4 text-gray-400" />
            {trial.venue}, {trial.city}
          </p>
        </div>

        {/* Apply Button */}
        <div className="mt-4 flex justify-center">
          
            <Link href={`/userfeed/tryout/application/${trial.id}`}
             className="
              w-full
              max-w-sm
              bg-teal-600
              text-white
              font-medium
              text-sm
              flex justify-center
              py-2.5
              rounded-lg
              hover:bg-teal-700
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
            ">View Details</Link>
            
        </div>
         <div>
          <span className="text-xs text-gray-500 my-1">Posted by: {scout.name}</span>
        </div>
      </div>
    
    </div>
  );
}