"use client";
import { useState } from "react";
import ApplicationCard from "../../../components/application";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

export default function MyApplications() {
  const applications = [
    {
      id: 1,
      title: "Elite Football Scholarship",
      venue: "National Stadium",
      city: "Lagos",
      appliedAt: "2026-06-12",
      deadline: "2026-07-18",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Youth Academy Trial",
      venue: "Teslim Balogun",
      city: "Lagos",
      appliedAt: "2026-05-20",
      deadline: "2026-06-15",
      status: "Accepted",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

        <div>
                  <Link
                    href="/userfeed/tryout"
                    className="flex items-center text-gray-500 hover:text-black mb-4"
                  >
                    <MdArrowBack />
                    <span className="ml-2">Back to Tryout</span>
                  </Link>
                </div>
        
        <div className="space-y-3 mb-8">

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        My Applications
      </h1>

      <p className="text-gray-500 mb-8">
        Track the progress of your tryout applications.
      </p>
        </div>

      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((item) => (
          <ApplicationCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

    </div>
  );
}