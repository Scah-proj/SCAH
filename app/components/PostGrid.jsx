"use client";

import Image from "next/image";
import Link from "next/link";

// A curated set of pleasant, high-contrast background/text pairs.
// Feel free to tweak the hex values to match your brand palette.
const COLOR_PALETTE = [
  { bg: "#F97316", text: "#FFFFFF" }, // orange
  { bg: "#0D9488", text: "#FFFFFF" }, // teal
  { bg: "#7C3AED", text: "#FFFFFF" }, // violet
  { bg: "#DB2777", text: "#FFFFFF" }, // pink
  { bg: "#2563EB", text: "#FFFFFF" }, // blue
  { bg: "#16A34A", text: "#FFFFFF" }, // green
  { bg: "#CA8A04", text: "#FFFFFF" }, // amber
  { bg: "#DC2626", text: "#FFFFFF" }, // red
  { bg: "#4F46E5", text: "#FFFFFF" }, // indigo
  { bg: "#0891B2", text: "#FFFFFF" }, // cyan
];

// Simple deterministic string hash (djb2) so the same post always
// gets the same color, instead of reshuffling on every re-render.
function hashStringToIndex(str, mod) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  // Force unsigned, then mod into palette range
  return Math.abs(hash) % mod;
}

function getColorForPost(post) {
  const key = String(post.id || post._id || post.caption || "post");
  const index = hashStringToIndex(key, COLOR_PALETTE.length);
  return COLOR_PALETTE[index];
}

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

  const color = !image ? getColorForPost(post) : null;

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
            <div
              className="aspect-square flex items-center justify-center p-4"
              style={{ backgroundColor: color.bg }}
            >
              <p
                className="text-sm text-center font-medium"
                style={{ color: color.text }}
              >
                {post.caption || "No Caption"}
              </p>
            </div>
          )}

        </div>
      </Link>
    </div>
  );
}