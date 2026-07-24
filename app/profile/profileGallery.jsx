"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Link from "next/link";
import PostGrid from "../components/PostGrid";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useGetMyPostsQuery } from "../../app/redux/api/feedApi";
import {
  setMyPosts,
  setLoadingMyPosts,
  setMyPostsError,
} from "../../app/redux/features/feed/feedSlice";

export default function ProfileGallery({ profile }) {
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    error,
  } = useGetMyPostsQuery();

  useEffect(() => {
    dispatch(setLoadingMyPosts(isLoading));

    if (data?.data?.posts) {
      dispatch(setMyPosts(data.data.posts));
    }

    if (error) {
      dispatch(setMyPostsError(error));
    }
  }, [data, isLoading, error, dispatch]);

  const posts = data?.data?.posts || [];

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
            {/* <TabsTrigger value="community">Community</TabsTrigger> */}
          </TabsList>

          <div className="w-full">
            {/* POSTS */}
            <TabsContent value="posts">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading posts...
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
                  <div className="max-w-2xl grid grid-cols-3">
                    {posts.slice(0, 6).map((post) => (
                      <PostGrid
                        key={post.id}
                        post={post}
                      />
                    ))}
                  </div>

                  {posts.length > 6 && (
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
                  <div className="max-w-2xl grid grid-cols-3">
                    {mediaPosts.slice(0, 6).map((post) => (
                      <PostGrid
                        key={post.id}
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

            {/* COMMUNITY
            <TabsContent value="community">
              Be a part of a Community
            </TabsContent> */}
          </div>
        </Tabs>
      </div>
    </div>
  );
}