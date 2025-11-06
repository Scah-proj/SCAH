"use client";
import { useState, useEffect } from "react";
import { getPosts } from "../../lib/posts";
import PostCard from "../post/page";

export default function FeedComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
