"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Share2, Bookmark, ListTodo } from "lucide-react";
import { timeAgo } from "../../../components/timeAgo"

// A small set of solid colors to fall back on when there's no cover
// image. Picked deterministically per-item (via a hash of its id/title)
// so the color stays stable across re-renders instead of jumping around
// every time the component mounts.
const COVER_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-fuchsia-500",
  "bg-orange-500",
  "bg-indigo-500",
];

const hashToIndex = (value, length) => {
  const str = String(value ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
};

const getCoverColor = (item, itemId) => {
  const seed = itemId || item.title || item.author || "fallback";
  return COVER_COLORS[hashToIndex(seed, COVER_COLORS.length)];
};

export default function TrendingCard({ item }) {
  const router = useRouter();

  const itemId = item.id || item._id;
  const hasCover = Boolean(item.cover);
  const coverColor = getCoverColor(item, itemId);

  const handleCardClick = () => {
    if (!itemId) return;

    if (item.type === "tryout") {
      router.push(`/userfeed/tryout/${itemId}`);
      return;
    }

    // Default to post for "post" type and anything unrecognized
    router.push(`/profile/Posts/${itemId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition flex flex-col h-full"
    >
      
      {/* Cover */}
      <div className="relative h-36 w-full">
        {hasCover ? (
          <Image
            src={item.cover}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className={`h-full w-full ${coverColor} flex items-center justify-center`}
          >
            <span className="text-white/90 font-semibold text-lg drop-shadow-sm px-3 text-center line-clamp-2">
              {item.title}
            </span>
          </div>
        )}
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