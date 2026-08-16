import Image from "next/image";
import { useUserStore } from "../../lib/userStore";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function FollowersProfile( {selectedFollowers, setSelectedFollowers}) {
    const { user } = useUserStore();
    const [followers, setFollowers] = useState([]);

    const toggleFollower = (id) => {
    setSelectedFollowers((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  };

    useEffect(() => {
        // async function fetchFollowers() {
        //     const res = await fetch('/api/user/followers');
        //     const data = await res.json();
        //     setFollowers(data.followers);
        // }
        // fetchFollowers();

        setFollowers([
            {id: 1, name: "John Doe", profilePicture: "/wen.webp"},
            {id: 2, name: "Jane Smith", profilePicture: "/wen.webp"},
            {id: 3, name: "Alice Johnson", profilePicture: "/wen.webp"},
            {id: 4, name: "Bob Brown", profilePicture: "/wen.webp"},
            {id: 5, name: "Charlie Davis", profilePicture: "/wen.webp"},
            {id: 6, name: "Diana Evans", profilePicture: "/wen.webp"},
            {id: 7, name: "Ethan Wilson", profilePicture: "/wen.webp"},
            {id: 8, name: "Fiona Miller", profilePicture: "/wen.webp"},
            {id: 9, name: "George Taylor", profilePicture: "/wen.webp"},
            {id: 10, name: "Hannah Anderson", profilePicture: "/wen.webp"},
        ])
    }, []);
    return(
        <div className="grid grid-cols-4 gap-4">
            {followers.map((follower) => {
                const isSelected = selectedFollowers.includes(follower.id);
                return(
                    <button
            key={follower.id}
            onClick={() => toggleFollower(follower.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg transition
              hover:bg-gray-100
            "
          >
            <div className="relative ">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border">
              <Image
                src={follower.profilePicture || <User className="w-5 h-5 text-gray-400" />}
                alt={follower.name}
                fill
                className="object-cover"
              />
                </div>

              {/* Check indicator */}
              {isSelected && (
                <div className="absolute bottom-0 right-0 w-4 h-4 p-1 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-center truncate w-full">
              {follower.name}
            </p>
          </button>
                )
            } )}
           
        </div>
    )
}