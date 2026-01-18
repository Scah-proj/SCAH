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
    <div className="space-y-6 max-w-4xl mx-auto">
        <div className="m-4">
        <p className="text-lg font-semibold mb-4">Try Outs</p>
        </div>
            <div>
              <TryoutSearch/>
            </div>
          <div className="flex items-center justify-between">
<div className="p-4 rounded-lg  flex flex-wrap gap-4 items-center">
  <p className="font-medium text-sm text-gray-700">Filter by:</p>

  {/* Sport */}
  <Select
    options={sportOptions}
 value={sportOptions.find(
    option => option.value === filters.sport
  )}    onChange={(option) =>
      setFilters(prev => ({ ...prev, sport: option.value }))
    }
    placeholder="All Sports"
     classNames={{
    control: (state) =>
      `border rounded-md text-sm  w-full ${
        state.isFocused ? "border-teal-500" : "border-gray-300"
      }`,
    option: (state) =>
      `px-3 py-2 cursor-pointer ${
        state.isFocused ? "bg-gray-100" : ""
      }`,
    menu: () => "bg-white shadow-lg border border-gray-200 rounded-md",
    menuList: () => "bg-white rounded-md",
    valueContainer: () => "p-1",
    placeholder: () => "text-gray-400",
  }}
  />
  <Select
    options={levelOptions}
 value={levelOptions.find(
    option => option.value === filters.level
  )}    onChange={(option) =>
      setFilters(prev => ({ ...prev, level: option.value }))
    }
    placeholder="Any Levels"
     classNames={{
    control: (state) =>
      `border rounded-md text-sm  w-full ${
        state.isFocused ? "border-teal-500" : "border-gray-300"
      }`,
    option: (state) =>
      `px-3 py-2 cursor-pointer ${
        state.isFocused ? "bg-gray-100" : ""
      }`,
    menu: () => "bg-white shadow-lg border border-gray-200 rounded-md",
    menuList: () => "bg-white rounded-md",
    valueContainer: () => "p-1",
    placeholder: () => "text-gray-400",
  }}
  />
 

  {/* Location */}
  {/* <select
    className="border rounded-md px-3 py-2 text-sm"
    value={filters.location}
    onChange={(e) =>
      setFilters(prev => ({ ...prev, location: e.target.value }))
    }
  >
    <option value="all">All Locations</option>
    <option value="Lagos">Lagos</option>
    <option value="Abuja">Abuja</option>
    <option value="Ibadan">Ibadan</option>
  </select> */}
</div>
{user?.role === "scout" && (

            <Button>
            <Link href="/userfeed/tryout/newTryout" className="flex items-center gap-2">
              Post New Tryout
            </Link>
            </Button>
)}
          </div>

          
        <div className="relative grid md:grid-cols-2 gap-4 w-full">
            {filteredTryouts.map((trial)=>(
           <div key={trial.id} className="space-6 ">

             <Trials key={trial.id} trial={trial}/>
           </div>
              
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