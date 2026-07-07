"use client";

import { useEffect, useMemo } from "react";
import Stories from "react-insta-stories";
import {
  useGetUserStoriesQuery,
  useViewStoryMutation,
} from "../../redux/api/storyApi";

export default function ViewStory({
  user,
  onClose,
  onNextUser,
}) {
  const {
    data,
    isLoading,
    error,
  } = useGetUserStoriesQuery(user?.userId, {
    skip: !user?.userId,
  });

  const [viewStory] = useViewStoryMutation();

  const userStories = data?.data?.stories || [];

  useEffect(() => {
    if (userStories.length > 0) {
      viewStory(userStories[0]._id);
    }
  }, [userStories, viewStory]);

  const stories = useMemo(() => {
    return userStories.map((story) => ({
      content: () => (
        <div className="relative w-full h-full bg-black">
          <img
            src={story.media?.url}
            alt={story.caption}
            className="w-full h-full object-cover"
          />

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-20">
            <img
              src={
                user.profilePicture ||
                user.picture ||
                "/default-avatar.png"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-white"
            />

            <div>
              <p className="text-white font-semibold text-sm">
                {`${user.firstName || ""} ${
                  user.lastName || ""
                }`.trim()}
              </p>

              <p className="text-gray-300 text-xs">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Caption */}
          {story.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 z-20">
              <p className="text-white text-sm">
                {story.caption}
              </p>
            </div>
          )}
        </div>
      ),

      onStoryStart: () => {
        viewStory(story._id);
      },
    }));
  }, [userStories, user, viewStory]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
        Loading stories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
        Failed to load stories.
      </div>
    );
  }

  if (!stories.length) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        className="
          relative
          bg-black
          w-full
          h-full
          sm:w-[420px]
          sm:h-[740px]
          sm:rounded-xl
          overflow-hidden
        "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-xl text-white"
        >
          ✕
        </button>

        <Stories
          stories={stories}
          defaultInterval={4000}
          width="100%"
          height="100%"
          onAllStoriesEnd={onNextUser}
        />
      </div>
    </div>
  );
}