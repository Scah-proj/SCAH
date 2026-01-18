import Image from "next/image";
import { Heart } from "lucide-react";
import { timeAgo } from "../../../components/timeAgo"
import { useState } from "react";
import Link from "next/link";

export default function Comment({ comment }) {
  const [likes, setLikes] = useState(comment.likes ?? 0);
    const [liked, setLiked] = useState(false);
   return (
    <div className="flex justify-between mb-4">

    <div className="flex gap-2">
       <Link href="/profile/123" className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border">
                  <Image
                      src='/wen.webp'
                      alt="Profile Picture"
                      width={48}
                      height={48}
                      className="object-cover"
                  />
              </div>
          </Link>
      <div>
        <p className="text-xs flex gap-2 items-center">
          <span className="font-medium">{comment.author}</span>
          <span>{timeAgo(comment.createdAt)}</span>
        </p>
        <div>
          {comment.text}
        </div>
        <div className="text-xs text-gray-500 flex gap-3">
          <button>Reply</button>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 flex flex-col items-center gap-1">
       <button className="flex space-y-1 mb-1" onClick={() => setLikes(liked ? likes - 1 : likes + 1) || setLiked(!liked)}>
          <Heart
            size={14}
            className={`transition ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>
          <div >
          {likes > 0 && <span>{likes}</span>}
          </div>
    
    </div>
    </div>
  );
}
