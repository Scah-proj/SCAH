"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useState, useEffect } from "react";
import { getPosts } from "../userfeed/lib/posts";
import PostGrid from "../components/PostGrid";
import Link from "next/link";

export default function ProfileGallery({profile}){
    const post = profile?.posts || [];
    // const [posts, setPosts] = useState([]);
    
    //   useEffect(() => {
    //     async function fetchData() {
    //       const data = await getPosts();
    //       setPosts(data);
    //     }
    //     fetchData();
    //   }, []);

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
  {post.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      No posts yet
    </div>
  ) : (
    <>
      <div className="max-w-2xl grid grid-cols-3">
        {post.slice(0, 6).map((post) => (
          <PostGrid key={post.id} post={post} />
        ))}
      </div>

      {post.length > 6 && (
        <div className="flex justify-end mt-4">
          <Link
            href="/profile/profileGallery/posts"
            className="px-3 py-1 rounded-full border border-teal-600 text-sm"
          >
            View all posts
          </Link>
        </div>
      )}
    </>
  )}
</TabsContent>
                <TabsContent value="media">
                    <div className="max-w-2xl grid grid-cols-3">
                        {post.slice(0, 6).map((post) => (
                            <PostGrid key={post.id} post={post} />
                        ))}
                        </div>
                        {post.length > 6 && (
                    <div className="flex justify-end mt-4">
                    <Link
                        href="/profile/profileGallery/Posts"
                        className="px-3 py-1 rounded-full border border-teal-600 text-sm"
                    >
                        View all media
                    </Link>
                    </div>
  )}
                </TabsContent>
                <TabsContent value="community">
                    Be a part of a Community
                </TabsContent>
                </div>
            </Tabs>
            </div>
        </div>
    )
}