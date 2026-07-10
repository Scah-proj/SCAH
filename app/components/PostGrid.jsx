"use client";

import Image from "next/image";
import Link from "next/link";

export default function PostGrid({ post }) {
  if (!post) {
    return (
      <p className="text-center text-gray-500">
        Loading post...
      </p>
    );
  }

  const image =
    post.media &&
    Array.isArray(post.media) &&
    post.media.length > 0
      ? post.media[0].url || post.media[0]
      : null;

  return (
    <div className="max-w-2xl">
      <Link
        href={`/profile/Posts/${post.id}`}
        className="block mb-2"
      >
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">

          {image ? (
            <div className="w-full aspect-square overflow-hidden">
              <Image
                src={image}
                alt="Post"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center p-4">
              <p className="text-sm text-center text-gray-700">
                {post.caption || "No Caption"}
              </p>
            </div>
          )}

        </div>
      </Link>
    </div>
  );
}