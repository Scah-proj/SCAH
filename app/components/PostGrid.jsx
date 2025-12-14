"use client";
import Image from 'next/image';
import { Heart, MessageCircle } from "lucide-react";
import Link from 'next/link';

export default function PostGrid({ post }) {
  if (!post) {
    // Prevent build error and show a placeholder instead
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  return (
    <div className="max-w-2xl">
      <Link href={`/post/${post?.id}`} className="block mb-2">
      <div key={post?.id} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      
        {/* Post image */}
        {post?.image && (
          <div className="w-full aspect-square overflow-hidden">
            <Image
              src={post.image}
              alt="Post Image"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        )}
      </div>
      </Link>
    </div>
  );
}
