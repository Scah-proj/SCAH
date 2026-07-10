"use client";

import { useParams } from "next/navigation";
import PostCard from "../../../components/PostCard";
// import { useGetPostByIdQuery } from "../../userfeed/redux/api/postApi";

export default function SinglePost() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError
  } = useGetPostByIdQuery(id);


  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        Loading post...
      </div>
    );
  }


  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load post
      </div>
    );
  }


  const post = data?.data?.post;


  return (
    <div className="max-w-2xl mx-auto py-10">
      <PostCard post={post}/>
    </div>
  );
}