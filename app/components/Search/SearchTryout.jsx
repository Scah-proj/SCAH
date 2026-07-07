"use client";

import SearchBar from "./SearchBar";

export default function TryoutSearch({
  query,
  setQuery,
}) {
  return (
    <SearchBar
      query={query}
      setQuery={setQuery}
      placeholder="Search upcoming tryouts..."
    />
  );
}