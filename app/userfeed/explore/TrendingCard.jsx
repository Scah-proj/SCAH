"use client";
import Image from "next/image";
import { Eye, Share2, Bookmark, ListTodo } from "lucide-react";
import { timeAgo } from "../../../components/timeAgo"


export default function TrendingCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition flex flex-col h-full">
      
      {/* Cover */}
      <div className="relative h-36 w-full">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2 flex flex-col flex-1">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{item.title}</h3>

        {item.type === "post" && (
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
              <Image
              src={item.profile}
              alt={item.author}
              width={34}
              height={34}
              className="object-cover"
              />
            </span>
             {item.author}</p>
        )}

        {item.type === "tryout" && (
          <p className="text-xs text-gray-500 flex items-center gap-2">
             <span className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
              <Image
              src={item.profile}
              alt={item.author}
              width={34}
              height={34}
              className="object-cover"
              />
            </span>
            {item.club}</p>
        )}

        <div className="flex justify-between text-xs mt-auto">   
          <div className="flex items-center justify-start gap-4 font-bold">
            <span className="flex items-center gap-1">
            <Eye size={14} />
            {item.views}
          </span>
          <span className="flex items-center gap-1">
            {item.type === "post" ?  <Bookmark size={14} /> :  <ListTodo size={14}/>}
            {item.engagement || item.applications}{" "}
          </span>
          </div>
          <div>
            <span className="">
          {timeAgo(item.createdAt)}
        </span>
          </div>
        
        </div>
      </div>
    </div>
  );
}
