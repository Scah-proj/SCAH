"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getPosts } from "../../userfeed/lib/posts";
import PostGrid from "@/app/components/PostGrid";
import Link from "next/link";

export default function ProfileGallery(){
    const [posts, setPosts] = useState([]);
    
      useEffect(() => {
        async function fetchData() {
          const data = await getPosts();
          setPosts(data);
        }
        fetchData();
      }, []);
    return(
        <div className="w-full flex justify-center items-center">
            <div>
            <Tabs defaultValue="posts" className="w-full">

                <TabsList className="mb-4 flex justify-between w-full">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                <div className="w-full">

                <TabsContent value="posts">
                    <Link href="/profile/profileGallery/Posts">
                    <div className="max-w-2xl grid grid-cols-3">
                        {posts.slice(0,6).map((post) => (
                            <PostGrid key={post.id} post={post} />
                        ))}
                        </div>
                    </Link>
                    <Link href="/profile/profileGallery/Posts" className="block text-right mt-4 text-teal-600 hover:underline">
                        View All Posts
                    </Link>
                </TabsContent>
                <TabsContent value="media">
                    <div className="max-w-2xl grid grid-cols-1 md:grid-cols-3">
                        {posts.map((post) => (
                            <PostGrid key={post.id} post={post} />
                        ))}
                        </div>
                         <Link href="/profile/profileGallery/Posts" className="block text-right mt-4 text-teal-600 hover:underline">
                        View All Media
                    </Link>
                </TabsContent>
                <TabsContent value="community">Be a part of a Community</TabsContent>
                </div>
            </Tabs>
            </div>
        </div>
    )
}