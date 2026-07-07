"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  query,
  setQuery,
  placeholder,
}) {
  return (
    <div className="flex justify-center border rounded-lg overflow-hidden relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 outline-none"
      />

      <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
    </div>
  );
}