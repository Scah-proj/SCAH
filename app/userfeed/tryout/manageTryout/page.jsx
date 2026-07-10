"use client";
import { useState } from "react";
import MyTryoutCard from "../../../components/manage";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

export default function ManageTryouts() {
 const tryouts = [
    {
      id: 1,
      title: "Elite Football Trial",
      sport: "Football",
      status: "Open",
      applicants: 47,
      deadline: "2026-07-18",
    },
    {
      id: 2,
      title: "Academy Scholarship",
      sport: "Football",
      status: "Closed",
      applicants: 112,
      deadline: "2026-06-01",
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
            Manage Tryouts
      </h1>

      <p className="text-gray-500 mb-8">
Manage your posted tryouts and review applicants.      </p>
        </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tryouts.map((item) => (
          <MyTryoutCard
            key={item.id}
            trial={item}
          />
        ))}
      </div>

    </div>
  );
}