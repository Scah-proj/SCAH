"use client";   
import SearchBar from "../../components/Search/SearchBar";
import ExploreSearch from "../../components/Search/SearchExplore";
import UserCard from "../../components/UserCard";
// import PostCard from "../../components/PostCard";
// import CommunityCard from "../../components/CommunityCard";
import { useEffect, useState } from "react";

const Page = () => {
 

   const [query, setQuery] = useState("");
  const [category, setCategory] = useState("user"); // user | post | community
  const { results, loading } = ExploreSearch({ query, category });  

  
    
    return(
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="m-4">
              <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search users, posts, communities..."
        />
            </div>

          <div className="flex gap-2">
        {["user", "post", "community"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition
              ${
                category === c
                  ? "bg-teal-600 text-white border border-teal-600"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}s
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-4">
        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && results.length === 0 && query && (
          <p className="text-gray-500">No results found.</p>
        )}
        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
              >
                {item.name || item.title}
              </div>
            ))}
          </div>
        )}
      </div>
        </div>
    )
}
export default Page;