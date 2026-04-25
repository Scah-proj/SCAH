"use client";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function FriendSearch() {

  async function handleSearch(query) {
    if (!query) return;

    const res = await fetch(
      `/api/friends/search?q=${query}`
    );
    const data = await res.json();
  }

  return (
    <>
      <SearchBar
        placeholder="Search close friends.."
        onSearch={handleSearch}
      />

      <div className="overflow-y-auto max-h-64">
        
      </div>
    </>
  );
}
