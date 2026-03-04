"use client"
import Trials from "../../components/trials";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../lib/userStore";
import { getTryout } from "../lib/tryOuts";
import TryoutSearch from "../../components/Search/SearchTryout";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Select from "react-select";


const Page = () =>   {
    const [tryOuts, setTryOuts ] = useState([]);
      useEffect(() => {
        async function fetchData(){
          const data = await getTryout();
          console.log("tryouts data:", data);
          setTryOuts(data);
        }
        fetchData();
        
      },[])
      const sportOptions = [
    { value: 'all', label: 'All Sports' },
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Tennis', label: 'Tennis' },
  ];
  const levelOptions = [
    { value: 'all', label: 'Any Levels' },
    { value: 'Academy', label: 'Academy' },
    { value: 'Semi-Pro', label: 'Semi-Pro' },
    { value: 'Pro', label: 'Pro' },
    { value: 'Scholarship', label: 'Scholarship' },
  ];
      const [filters, setFilters] = useState({
  sport: "all",
  level: "all",
});
const filteredTryouts = tryOuts.filter(trial => {
  const sportMatch =
    filters.sport === "all" || trial.sport === filters.sport;

  const levelMatch =
    filters.level === "all" || trial.level === filters.level;

  return sportMatch && levelMatch;
});

  const { user } = useUserStore();
        if (!user){
    return <p>Loading...</p>;
  
        }
     
return(
    <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
       <div className="space-y-3">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
    Discover Tryouts
  </h1>
  <p className="text-gray-500 text-sm">
    Explore available sports tryouts and filter by sport or level.
  </p>
</div>
<div className="px-4 space-y-6">
  <TryoutSearch />

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    <div className="flex flex-wrap items-center gap-4">
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
        Filters
      </p>

      <div className="w-48">
        <Select
          options={sportOptions}
          value={sportOptions.find(option => option.value === filters.sport)}
          onChange={(option) =>
            setFilters(prev => ({ ...prev, sport: option.value }))
          }
          classNames={{
            control: (state) =>
              `border rounded-lg text-sm ${
                state.isFocused ? "border-teal-500" : "border-gray-300"
              }`,
            menu: () => "border border-gray-200 rounded-lg",
          }}
        />
      </div>

      <div className="w-48">
        <Select
          options={levelOptions}
          value={levelOptions.find(option => option.value === filters.level)}
          onChange={(option) =>
            setFilters(prev => ({ ...prev, level: option.value }))
          }
          classNames={{
            control: (state) =>
              `border rounded-lg text-sm ${
                state.isFocused ? "border-teal-500" : "border-gray-300"
              }`,
            menu: () => "border border-gray-200 rounded-lg",
          }}
        />
      </div>
    </div>

    {user?.role === "scout" && (
      <Button className="bg-teal-600">
        <Link href="/userfeed/tryout/newTryout">
          Post Tryout
        </Link>
      </Button>
    )}
  </div>
</div>

          
       <div className="grid sm:grid-cols-2 gap-8">
  {filteredTryouts.map((trial) => (
    <Trials key={trial.id} trial={trial} />
  ))}
</div>
             
        
    </div>
)
}
export default Page;

function formatDate(date) {
  if (!date) return ""

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date) {
  return !!date && !isNaN(date.getTime())
}