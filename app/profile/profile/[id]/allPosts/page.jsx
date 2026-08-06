"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import PostCard from "../../../../components/PostCard";

import { useGetMyProfileQuery } from "../../../../redux/api/profileApi";
import {
  useGetMyPostsQuery,
  useGetProfileFeedQuery, // Fixed: correctly maps to /api/feed/profile/${userId}
} from "../../../../redux/api/feedApi";

function AllPostsContent() {
  const searchParams = useSearchParams();
  const userIdQuery = searchParams.get("userId");

  // 1. Fetch active user profile to evaluate ownership
  const { data: myProfile, isLoading: isLoadingMyProfile } = useGetMyProfileQuery();
  const currentUserId = myProfile?._id || myProfile?.userId || myProfile?.data?._id;

  // 2. Identify target user & ownership status
  const isOwnProfile = !userIdQuery || userIdQuery === currentUserId;
  const targetUserId = isOwnProfile ? currentUserId : userIdQuery;

  // 3. Conditional queries with skip guards
  const { data: myPostsData, isLoading: isLoadingMyPosts } = useGetMyPostsQuery(
    undefined,
    { skip: !isOwnProfile }
  );

  const { data: userPostsData, isLoading: isLoadingUserPosts } = useGetProfileFeedQuery(
    targetUserId,
    { skip: isOwnProfile || !targetUserId }
  );

  // 4. Resolve raw response structure safely
  const rawPostsData = isOwnProfile ? myPostsData : userPostsData;
  const posts = Array.isArray(rawPostsData)
    ? rawPostsData
    : rawPostsData?.data?.posts ||
      rawPostsData?.data ||
      rawPostsData?.posts ||
      [];

  const isLoading =
    isLoadingMyProfile || (isOwnProfile ? isLoadingMyPosts : isLoadingUserPosts);

  // Helper function to resolve counts safely regardless of API structure
  const getCount = (val) => {
    if (typeof val === "number") return val;
    if (Array.isArray(val)) return val.length;
    if (val && typeof val.count === "number") return val.count;
    return 0;
  };

  // 5. Transform raw post object into PostCard compatible structure
  const formattedPosts = posts.map((post) => {
    const authorObj = post.author || post.user || {};

    const mediaItem = post.media?.[0];
    const resolvedImage =
      typeof mediaItem === "string"
        ? mediaItem
        : mediaItem?.url || post.mediaUrl || post.image || null;

    return {
      ...post,
      id: post._id || post.id,

      author:
        authorObj.name ||
        `${authorObj.firstName || ""} ${authorObj.lastName || ""}`.trim() ||
        "Unknown",

      authorAvatar:
        authorObj.picture ||
        authorObj.avatar ||
        authorObj.profilePicture ||
        "/default-avatar.png",

      title: post.caption || post.content || post.text || "",

      image: resolvedImage,

      hashtags: Array.isArray(post.tags) ? post.tags : [],

      likes: getCount(post.likesCount || post.likes),

      comments: getCount(post.commentsCount || post.comments),

      saves: getCount(post.savesCount || post.saves),

      shares: getCount(post.sharesCount || post.shares),

      status: post.isActive ? "Active" : "Inactive",

      createdAt: post.createdAt || post.created_at,

      position: post.position || "",

      sport: post.sport || "",
    };
  });

  const backLink = isOwnProfile ? "/profile" : `/profile/${targetUserId}`;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center space-x-4 mb-6 sticky top-0 bg-white/90 backdrop-blur-md py-3 z-10 border-b border-gray-100">
          <Link
            href={backLink}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
          >
            <MdArrowBack size={24} />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            {isOwnProfile ? "My Posts" : "User Posts"}
          </h1>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
            <p className="text-sm text-gray-500">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4 py-6">
      {/* Dynamic Header */}
      <div className="flex items-center space-x-4 mb-6 sticky top-0 bg-white/90 backdrop-blur-md py-3 z-10 border-b border-gray-100">
        <Link
          href={backLink}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
        >
          <MdArrowBack size={24} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isOwnProfile ? "My Posts" : "User Posts"}
          </h1>
          <p className="text-xs text-gray-500">
            {`${formattedPosts.length} ${formattedPosts.length === 1 ? "post" : "posts"}`}
          </p>
        </div>
      </div>

      {/* Dynamic Post Feed */}
      <div className="relative space-y-6">
        {formattedPosts.length > 0 ? (
          formattedPosts.map((post) => (
            <PostCard
              key={post.id || post._id}
              post={post}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <p className="text-gray-500">
              {isOwnProfile
                ? "You haven't published any posts yet."
                : "This user hasn't published any posts yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapped with React Suspense to satisfy Next.js App Router rules for useSearchParams()
export default function AllPostsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-20 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
        </div>
      }
    >
      <AllPostsContent />
    </Suspense>
  );
}