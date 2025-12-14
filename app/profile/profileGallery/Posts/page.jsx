"use client";
import { useState, useEffect } from "react";
import { getPosts } from "@/app/userfeed/lib/posts";
// import PostCard from "@/app/components/PostCard";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import PostGrid from "@/app/components/PostGrid";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
        <div className="flex items-center px-4 py-4">
            <Link href="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
            <MdArrowBack/>
            <p className="px-2">Posts</p>
            </Link>
        </div>
    <div className="grid grid-cols-3 max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostGrid key={post.id} post={post} />
      ))}
    </div>
    </div>
  );
}
