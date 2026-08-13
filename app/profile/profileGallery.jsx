"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Link from "next/link";
import PostGrid from "../components/PostGrid";

export default function ProfileGallery({
  posts = [],
  isLoading = false,
  error = null,
}) {
  const mediaPosts = posts.filter(
    (post) => Array.isArray(post.media) && post.media.length > 0
  );

  return (
    <div className="w-full flex justify-center items-center">
      <div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-4 flex justify-between w-full">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <div className="w-full">
            {/* POSTS */}
            <TabsContent value="posts">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading posts....
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  Failed to load posts
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No posts yet
                </div>
              ) : (
                <>
                  <div className="max-w-2xl grid grid-cols-3 gap-2">
                    {posts.slice(0, 6).map((post) => (
                      <PostGrid
                        key={post._id || post.id}
                        post={post}
                      />
                    ))}
                  </div>

                  
                </>
              )}
            </TabsContent>

            {/* MEDIA */}
            <TabsContent value="media">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading media...
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  Failed to load media
                </div>
              ) : mediaPosts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No media yet
                </div>
              ) : (
                <>
                  <div className="max-w-2xl grid grid-cols-3 gap-2">
                    {mediaPosts.slice(0, 6).map((post) => (
                      <PostGrid
                        key={post._id || post.id}
                        post={post}
                      />
                    ))}
                  </div>

                  {mediaPosts.length > 6 && (
                    <div className="flex justify-end mt-4">
                      <Link
                        href="/profile/profileGallery/posts"
                        className="px-3 py-1 rounded-full border border-teal-600 text-sm"
                      >
                        View all media
                      </Link>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}