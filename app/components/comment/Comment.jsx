import Image from "next/image";
import { Heart, User } from "lucide-react";
import { time } from "../../../components/timeAgo"
import { useState } from "react";
import Link from "next/link";

export default function Comment({ comment }) {
  const [likes, setLikes] = useState(comment.likes ?? 0);
    const [liked, setLiked] = useState(false);

    // Resolve the commenter's profile picture (no default image fallback)
    const picture =
      comment.user?.picture ||
      comment.user?.avatar ||
      comment.user?.profilePicture ||
      comment.avatar ||
      comment.picture ||
      null;

    // Resolve the commenter's id for the profile link
    const profileHref = comment.user?.id
      ? `/profile/${comment.user.id}`
      : "/profile";

   return (
    <div className="flex justify-between mb-4">

    <div className="flex gap-2">
       <Link href={profileHref} className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
                  {picture ? (
                    <Image
                      src={picture}
                      alt="Profile Picture"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-500" />
                  )}
              </div>
          </Link>
      <div>
        <p className="text-xs flex gap-2 items-center">
          <span className="font-medium">{comment.author}</span>
          <span>{time(comment.createdAt)}</span>
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
