"use client";
import { useState, useEffect } from "react";
import { getPosts } from "../../lib/posts";
import PostCard from "../../../components/PostCard";
import StoryComponent from "../../storyComponent/page";
import { AiOutlinePlus } from "react-icons/ai";
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

  const handleAddPost = () => {
    // Implement logic to add a new post
    router.push('/profile/profileGallery/createPost');
  };

  return (
    <div className=" space-y-6 max-w-2xl mx-auto">
      <div>
      <StoryComponent/>
      </div>
      <div className="relative space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button
  aria-label="Create post"
  className="
    fixed bottom-6 right-6 z-50
    w-14 h-14 rounded-full
    bg-teal-500 text-white text-3xl
    flex items-center justify-center
    shadow-xl
    hover:scale-105 active:scale-95
    transition-transform cursor-pointer
  "
  onClick={handleAddPost}
>
  <AiOutlinePlus color="white" size={22}/>
</button>
      </div>

    </div>
  );
}
