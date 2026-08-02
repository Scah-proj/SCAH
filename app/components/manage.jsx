"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, MapPin, Settings, ArrowRight } from "lucide-react";
import { BiFootball, BiBasketball } from "react-icons/bi";
import { CiFootball } from "react-icons/ci";

export default function MyTryoutCard({ trial }) {
  const sportConfig = {
    football: {
      bg: "bg-teal-800",
      Icon: BiFootball,
    },
    basketball: {
      bg: "bg-orange-500",
      Icon: BiBasketball,
    },
    soccer: {
      bg: "bg-lime-600",
      Icon: CiFootball,
    },
  };

  const sport =
    sportConfig[trial?.sport?.toLowerCase()] || {
      bg: "bg-gray-500",
      Icon: null,
    };

  const deadline = new Date(trial.deadline);
  const today = new Date();
  const open = deadline >= today;

  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-200 p-5">

      {/* Top badges */}
      <div className="flex justify-between items-start">
        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white ${sport.bg}`}
        >
          {sport.Icon && <sport.Icon size={14} />}
          {trial.sport}
        </span>

        <span
          className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ring-1 ring-inset ${
            open
              ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
              : "bg-gray-100 text-gray-500 ring-gray-400/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-100" : "bg-gray-400"}`} />
          {open ? "Open" : "Closed"}
        </span>
      </div>

      {/* Title + Badge image */}
      <div className="flex items-center gap-3 mt-4">
         <span className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
                      <Image
                        src={trial.badge || "/images/avatar.png"}
                        alt="Tryout"
                        width={34}
                        height={34}
                        className="object-cover"
                      />
                    </span>
        

        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900 truncate">
            {trial.title}
          </h2>
          <p className="text-sm text-gray-500">
            {trial.level}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{trial.city}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users size={16} className="text-gray-400 flex-shrink-0" />
          <span>{trial.applicants ?? 0} Applicants</span>
        </div>

        <div className="col-span-2 flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <span>
            Ends {deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {open && daysLeft <= 5 && (
            <span className="ml-auto text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              {daysLeft <= 0 ? "Ends today" : `${daysLeft}d left`}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-gray-100">
        <Link
          href={`/userfeed/tryout/manageTryout/${trial._id}/edit`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <Settings size={15} />
          Edit
        </Link>

        <Link
          href={`/userfeed/tryout/application/${trial._id}`}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 text-white py-2.5 text-center text-sm font-medium hover:bg-teal-700 transition-colors group/btn"
        >
          Application
          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>

    </div>
  );
}