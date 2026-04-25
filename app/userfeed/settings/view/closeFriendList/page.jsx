"use client"
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FriendSearch from "../../../../components/Search/SearchFriends";
const friendList = [
    {
        name: "Sammy Tunde",
        username: "sammytunde",
        profile: "/wen.webp",
    },
    {
        name: "Michael Oduntan",
        username: "michaeloduntan",
        profile: "/wen.webp",
    },
];
const Page = () => {
    return(
        <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
             <div className="space-y-3">
                <Link
                        href="/userfeed/settings"
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                      >
                        <MdArrowBack />
                        <span className="ml-2 text-sm font-medium">Back to Settings </span>
                      </Link>
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
                Close Friends
            </h1>
            </div>
            <div className="px-4 space-y-6">
            {/* searchbar */}
             <div className="">
                <FriendSearch/>
             </div>

            <div className="space-y-4">
                {friendList.map((friend) => (
  <div key={friend.username} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-500">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border">
                          <Image
                          src={friend.profile}
                          alt={friend.name}
                          width={46}
                          height={36}
                          className="object-cover"
                          />
              </div>
            </span>
            <div>
            <span className="font-semibold">{friend.name}</span>
            <p className="text-sm text-gray-500">@{friend.username}</p>
            </div>
            </div>
          <span className="text-gray-400"><ChevronRight size={18} /></span>
  </div>
))}
            </div>
           
            </div>
        </div>
    )
}
export default Page;