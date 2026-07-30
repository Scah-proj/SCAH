"use client";

import { useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import PostCard from "../../../components/PostCard";
import { useGetPostByIdQuery } from "../../../redux/api/feedApi";

export default function SinglePost() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // RTK Query hook gives us access to error status
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetPostByIdQuery(id);

  const post = data?.data;

  // Check if the query returned a 401 Unauthorized status
  const isUnauthorized = isError && error?.status === 401;

  useEffect(() => {
  // If the API fails due to unauthenticated session (or 401), send user to /auth/login
  if (isUnauthorized) {
    const loginUrl = `/auth/login?redirectTo=${encodeURIComponent(pathname)}`;
    router.replace(loginUrl);
  }
}, [isUnauthorized, pathname, router]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl border-x border-gray-200 ">
        
        <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 cursor-pointer"
            aria-label="Go back"
          >
            <MdArrowBack size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Post</h1>
        </div>

        {/* Body */}
        {isLoading || isUnauthorized ? (
          <div className="animate-pulse divide-y divide-gray-100">
            <div className="flex gap-3 px-4 py-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>
            <div className="space-y-2 px-4 py-4">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-5/6 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>
            <div className="aspect-square w-full bg-gray-100" />
            <div className="flex gap-8 px-4 py-4">
              <div className="h-5 w-10 rounded bg-gray-200" />
              <div className="h-5 w-10 rounded bg-gray-200" />
              <div className="h-5 w-10 rounded bg-gray-200" />
              <div className="h-5 w-10 rounded bg-gray-200" />
            </div>
          </div>
        ) : isError || !post ? (
          <div className="flex flex-col items-center gap-3 px-4 py-20 text-center">
            <p className="text-base font-semibold text-gray-900">
              This post couldn&apos;t be loaded
            </p>
            <p className="text-sm text-gray-500">
              It may have been removed, or something went wrong.
            </p>
            <button
              onClick={() => router.back()}
              className="mt-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-700 cursor-pointer"
            >
              Go back
            </button>
          </div>
        ) : (
          <PostCard post={post} />
        )}
      </div>
    </div>
  );
}