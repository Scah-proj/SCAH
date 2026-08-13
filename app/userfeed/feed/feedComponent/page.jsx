"use client";

import PostCard from "../../../components/PostCard";
import StoryComponent from "../../storyComponent/page";
import { useGetHomeFeedQuery } from "../../../redux/api/feedApi";
import { Loader } from "lucide-react";

export default function FeedComponent() {
  const {
    data,
    isLoading,
    error,
  } = useGetHomeFeedQuery();

  const posts = data?.data?.posts || [];

  const formattedPosts = posts.map((post) => ({
    ...post,

    author:
      post.author?.name ||
      `${post.author?.firstName || ""} ${
        post.author?.lastName || ""
      }`.trim() ||
      "Unknown",

    authorAvatar:
      post.author?.picture ||
      "/default-avatar.png",

    title: post.caption || "",

    image:
      post.media?.[0]?.url ||
      post.media?.[0] ||
      null,

    hashtags: post.tags || [],

    likes:
      post.likesCount ||
      post.likes?.count ||
      0,

    comments:
      post.commentsCount ||
      post.comments?.count ||
      0,

    saves:
      post.savesCount ||
      post.saves?.count ||
      0,

    shares:
      post.sharesCount ||
      post.shares?.count ||
      0,

    status: post.isActive ? "Active" : "Inactive",

    createdAt:
      post.createdAt ||
      post.created_at,

    position:
      post.position || "",

    sport:
      post.sport || "",
  }));

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <StoryComponent />

        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader  className="h-6 w-6 animate-spin text-teal-600" />

            <p className="text-sm text-gray-500">
              Loading feed...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Feed Error:", error);

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <StoryComponent />

        <div className="text-center py-12">
          <p className="text-red-500">
            Failed to load feed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <StoryComponent />
      </div>

      <div className="relative space-y-6">
        {formattedPosts.length > 0 ? (
          formattedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nothing to see yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}