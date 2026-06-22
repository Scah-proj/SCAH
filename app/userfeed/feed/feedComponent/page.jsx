"use client";
import { useState, useEffect } from "react";
import { getRequest } from "../../../api";
import { getPosts } from "../../lib/posts";
import PostCard from "../../../components/PostCard";
import StoryComponent from "../../storyComponent/page";
import { useRouter } from "next/navigation";

export default function FeedComponent() {
  const [posts, setPosts] = useState([]);
      const router = useRouter();
      const [loading, setLoading] = useState(true);
  
 useEffect(() => {
  async function fetchData() {
    try {
      const response = await getRequest("/api/feed/home");

      console.log("Feed response:", response);

      setPosts(response.data || []);
    } catch (error) {
      console.log("Feed error:", error);
      console.log("Feed error message:", error.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, []);

if (loading) {
  return (
    <div className="text-center py-12">
      Loading posts...
    </div>
  );
}
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
      <StoryComponent/>
      </div>
      <div className="relative space-y-6 ">
        
     {posts.length > 0 ? (
  posts.map((post) => (
    <PostCard
      key={post._id || post.id}
      post={post}
    />
  ))
) : (
  <div className="text-center py-12">
    <p className="text-gray-500">
      Nothing to see yet.
    </p>
  </div>
)}
      </div>
     

    </div>
  );
}
