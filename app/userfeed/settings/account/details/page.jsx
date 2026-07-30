"use client";

import { personalDetailRoutes } from "./routes";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MdArrowBack } from "react-icons/md";
import { useGetMyProfileQuery } from "../../../../redux/api/profileApi"; // Adjust relative path as needed

const Page = () => {
  const { data: profile } = useGetMyProfileQuery();

  // Helper function to safely format object values or primitive strings
  const formatLocation = (loc, fallback) => {
    if (!loc) return fallback;

    // If it's an object with country, state, city
    if (typeof loc === "object") {
      const parts = [loc.city, loc.state, loc.country].filter(Boolean);
      return parts.length > 0 ? parts.join(", ") : fallback;
    }

    
    return loc;
  };

  const getDisplayValue = (item) => {
    if (!profile) return item.placeholder;

    switch (item.label?.toLowerCase()) {
      case "name":
        if (profile.firstName || profile.lastName) {
          return `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
        }
        return profile.name || profile.fullName || item.placeholder;

      case "phone":
        return profile.phone || profile.phoneNumber || item.placeholder;

      case "email":
        return profile.email || profile.user?.email || item.placeholder;

      case "country":
        // Extract country from location object or string safely
        const rawCountry = profile.country || profile.location;
        return formatLocation(rawCountry, item.placeholder);

      default:
        const value = profile[item.label?.toLowerCase()];
        if (typeof value === "object" && value !== null) {
          return formatLocation(value, item.placeholder);
        }
        return value || item.placeholder;
    }
  };

  return (
    <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
      <div className="space-y-3">
        <Link
          href="/userfeed/settings"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Settings </span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Account Center
        </h1>
      </div>

      <div className="px-4 space-y-6">
        <div className="space-y-4">
          {personalDetailRoutes.map((section) => (
            <div key={section.title}>
              <div className="bg-white rounded-xl border">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.path || "#"}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition"
                  >
                    <div>
                      <span className="font-semibold">{item.label}</span>
                    </div>

                    <div className="flex gap-1 items-center">
                      <p className="text-sm text-gray-500">
                        {getDisplayValue(item)}
                      </p>
                      <span className="text-gray-400">
                        <ChevronRight size={18} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;