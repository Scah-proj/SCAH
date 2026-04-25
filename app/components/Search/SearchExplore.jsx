"use client";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function ExploreSearch({ query, category }) {
  const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

 useEffect(() => {
    if(!query){
      setResults([]);
      return;
    }


    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // ===== Backend fetch (uncomment when ready) =====
        // const res = await fetch(`/api/search?query=${query}&type=${category}`);
        // const data = await res.json();

        let data = [];
        if (category === "user") {
                    data = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Alice Smith" },
          ].filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
        } else if (category === "posts") {
          data = [
            { id: 1, title: "Amazing goal scored!" },
            { id: 2, title: "Top training drills" },
          ].filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
        } else if (category === "communities") {
          data = [
            { id: 1, name: "Football Fans" },
            { id: 2, name: "Youth Scouts" },
          ].filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
        }

        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category]);

  // return { results, loading };
}

 
