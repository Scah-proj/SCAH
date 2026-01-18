"use client";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function FollowersSearch() {
  const [followers, setFollowers] = useState([]);

  async function handleSearch(query) {
    if (!query) return;

    const res = await fetch(
      `/api/followers/search?q=${query}`
    );
    const data = await res.json();
    setFollowers(data);
  }

  return (
    <>
      <SearchBar
        placeholder="Search"
        onSearch={handleSearch}
      />

      <div className="overflow-y-auto max-h-64">
        {followers.map(f => (
          <div key={f.id}>{f.name}</div>
        ))}
      </div>
    </>
  );
}
