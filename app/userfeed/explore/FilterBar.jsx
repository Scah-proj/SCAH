"use client";
import { useState } from "react";

const filters = ["All", "Football", "Basketball", "Athletics", "Scouts", "Academies"];

export default function FilterBar() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer
            ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
