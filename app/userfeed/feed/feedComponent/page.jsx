"use client";
import { useState, useEffect } from "react";
import { getPosts } from "../../lib/posts";
import PostCard from "../../../components/PostCard";
import StoryComponent from "../../storyComponent/page";
import { useRouter } from "next/navigation";

export default function FeedComponent() {
  const [posts, setPosts] = useState([]);
      const router = useRouter();
  
  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
      <StoryComponent/>
      </div>
      <div className="relative space-y-6 ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post}/>
      ))}
      </div>
     

    </div>
  );
}
