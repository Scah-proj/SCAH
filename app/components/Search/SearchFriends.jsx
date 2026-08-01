"use client";

import { Search, X } from "lucide-react";

// Controlled search input — no fetching, no endpoint.
// Parent (Page) owns the searchTerm state and filters its
// already-fetched `mutuals` list based on this value.
export default function FriendSearch({ value, onChange, placeholder = "Search close friends.." }) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}