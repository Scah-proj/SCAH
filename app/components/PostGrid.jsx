"use client";
import Image from 'next/image';
import { Heart, MessageCircle } from "lucide-react";

export default function PostGrid({ post }) {
  if (!post) {
    // Prevent build error and show a placeholder instead
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  return (
    <div className="border max-w-2xl">
      <div key={post?.id} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      
        {/* Post image */}
        {post?.image && (
          <div className="w-full">
            <Image
              src={post.image}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
