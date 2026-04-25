"use client";
import { useState, useEffect } from "react";
import { getPosts } from "../../../../userfeed/lib/posts";
import PostGrid from "../../../../components/PostGrid";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";


const filters = ["All", "Collection", "Reels", "Posts", "Audio",];

export default function FilterBar() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const data = await getPosts();
    
      const postsWithTime = data.map(post => ({
        ...post,
        createdAt: post.createdAt || new Date().toISOString(),
      }));
    
      setPosts(postsWithTime);
        }
      fetchData();
    }, []);
  const [active, setActive] = useState("All");

  return (
    <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
      <Link
              href="/userfeed/settings"
              className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
            >
              <MdArrowBack />
              <span className="ml-2 text-sm font-medium">Back to Settings </span>
            </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Saved
            </h1>
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-6 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer
            ${
              active === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
      <div>
        <h2 className="font-semibold text-lg">Reels and posts</h2>
        <div className="grid grid-cols-3 max-w-3xl mx-auto">
              {posts.map((post) => (
                <PostGrid key={post.id} post={post} />
              ))}
            </div>
      </div>
    </div>
  );
}
