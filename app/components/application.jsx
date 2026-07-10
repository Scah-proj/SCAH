import Link from "next/link";
import Image from "next/image";

import { MdLocationOn, MdCalendarToday, MdSchedule, MdArrowForward } from "react-icons/md";

export default function ApplicationCard({ item }) {

 const statusConfig = {
  "Under Review": {
    color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    dot: "bg-yellow-500",
  },
  Accepted: {
    color: "bg-green-100 text-green-800 border border-green-200",
    dot: "bg-green-500",
  },
  Rejected: {
    color: "bg-red-100 text-red-800 border border-red-200",
    dot: "bg-red-500",
  },
  Invited: {
    color: "bg-blue-100 text-blue-800 border border-blue-200",
    dot: "bg-blue-500",
  },
};

  const status = statusConfig[item.status] || statusConfig["Under Review"];

  // Calculate days remaining until deadline
  const daysLeft = Math.ceil(
    (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200">

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
             <span className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
                          <Image
                            src={item.badge || "/images/avatar.png"}
                            alt="Tryout"
                            width={34}
                            height={34}
                            className="object-cover"
                          />
                        </span>
            
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {item.title}
          </h3>

          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
            <MdLocationOn className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{item.venue}, {item.city}</span>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-medium ring-1 ring-inset whitespace-nowrap ${status.color}`}
        >
          <span className={`w-1.5 h-1.5  rounded-full ${status.dot}`} />
          {item.status}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-gray-500">
          <MdCalendarToday className="w-4 h-4" />
          <span>Applied {new Date(item.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <MdSchedule className="w-4 h-4 text-gray-500" />
          <span className={daysLeft <= 3 && daysLeft >= 0 ? "text-red-600 font-medium" : "text-gray-500"}>
            {daysLeft > 0 
              ? `${daysLeft}d left` 
              : daysLeft === 0 
              ? "Due today" 
              : "Closed"}
          </span>
        </div>
      </div>

      <Link
        href={`/userfeed/tryout/application/${item.id}`}
        className="mt-4 flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors group/btn"
      >
        View Application
        <MdArrowForward className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>

    </div>
  );
}