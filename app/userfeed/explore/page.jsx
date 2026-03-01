"use client";   
import SearchBar from "../../components/Search/SearchBar";
import ExploreSearch from "../../components/Search/SearchExplore";
import UserCard from "../../components/UserCard";
// import PostCard from "../../components/PostCard";
// import CommunityCard from "../../components/CommunityCard";
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TrendingSection from "./TrendingSection";
import ScoutProfileConnect from "../../profile/followScout";
import ScoutProfile from "../../components/ScoutProfile";
import { getProfiles } from "../../userfeed/lib/profile";


const Page = () => {
 

   const [query, setQuery] = useState("");
  const [category, setCategory] = useState("user"); // user | post | community
  const { results, loading } = ExploreSearch({ query, category });  

    const [profile, setProfile] = useState([]);
          
            useEffect(() => {
              async function fetchData() {
                const data = await getProfiles();
                setProfile(data);
              }
              fetchData();
            }, []);
  
             const scoutProfiles = profile.filter(
      (profile) => profile.role === "Scout"
    );
    
    return(
        <div className="space-y-8 max-w-3xl px-4 py-8 mx-auto">
          <h1 className="text-2xl font-bold">Explore</h1>
            <div className="">
              <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search users, posts, communities..."
        />
            </div>
{/* 
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
      </div> */}
      <div className="space-y-6">
        <FilterBar/>
        <TrendingSection/>
        <div className="p-2 my-4 space-y-4">
                <p className=" font-semibold text-lg">Suggested People</p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

                 {profile.map((profile) => (
                      <div key={profile.id} className="border px-4"> 
              
                        <ScoutProfile key={profile.id} profile={profile} />
                      </div>
                    ))}
                </div>
          </div>
      </div>
        </div>
    )
}
export default Page;