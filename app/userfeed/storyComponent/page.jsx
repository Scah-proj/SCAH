"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StoryAvatar from "./StoryAvatar";
import ViewStory from "./ViewStory";
import CreateStory from "./CreateStory";

import { useGetFeedStoriesQuery } from "../../redux/api/storyApi";
import { useGetMyProfileQuery } from "../../redux/api/profileApi";

import {
  setFeedStories,
  setLoadingFeedStories,
  setFeedStoriesError,
} from "../../redux/features/story/storySlice";

export default function StoryComponent() {
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(null);
  const [viewedUsers, setViewedUsers] = useState({});
  const [openCreateStory, setOpenCreateStory] = useState(false);
  const [showMyStory, setShowMyStory] = useState(false);

  // Logged-in user profile
  const { data: myProfile } = useGetMyProfileQuery();

  const {
    data,
    isLoading,
    error,
  } = useGetFeedStoriesQuery();

  const users =
    useSelector((state) => state.story.feedStories) || [];

    const otherUsers = users.filter(
  (user) =>
    user.userId !== myProfile?._id &&
    user.userId !== myProfile?.userId
);

  useEffect(() => {
    dispatch(setLoadingFeedStories(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data?.data?.stories) {
      dispatch(setFeedStories(data.data.stories));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setFeedStoriesError(error));
    }
  }, [error, dispatch]);

  const myStory = users.find(
  (user) =>
    user.userId === myProfile?._id ||
    user.userId === myProfile?.userId
);
console.log("myProfile", myProfile);
console.log("users", users);
  const activeUser =
  activeIndex !== null ? otherUsers[activeIndex] : null;

  const closeStories = () => {
    setActiveIndex(null);
  };

  const goToNextUser = () => {
    setActiveIndex((prev) => {
      if (prev === null) return null;

      if (prev + 1 < otherUsers.length) {
        return prev + 1;
      }

      return null;
    });
  };


  const markViewedAndGoNext = () => {
    if (activeUser) {
      setViewedUsers((prev) => ({
        ...prev,
        [activeUser.userId]: true,
      }));
    }

    setTimeout(goToNextUser, 0);
  };

  // Logged-in user's profile picture
  const myProfilePicture =
    myProfile?.profile?.profilePicture ||
    myProfile?.profilePicture ||
    myProfile?.user?.profilePicture ||
    "/default-avatar.png";

  if (isLoading) {
    return (
      <div className="flex p-3 space-x-4 overflow-x-auto">
        <p className="text-sm text-gray-500">
          Loading stories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex p-3 space-x-4 overflow-x-auto">
        <p className="text-sm text-red-500">
          Failed to load stories.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex space-x-4 p-3 overflow-x-auto no-scrollbar">

        {/* Your Story */}
        <StoryAvatar
  owner
    onAddStory={() => setOpenCreateStory(true)}
  hasStory={!!myStory}
  hasUnseenStories={false}
  avatar={
    myStory?.profilePicture ||
    myProfilePicture
  }
  onClick={() => {
    if (myStory) {
      setShowMyStory(true);
    } else {
      setOpenCreateStory(true);
    }
  }}
/>

        {/* Feed Stories */}
        {otherUsers.map((user, index) => (
          <StoryAvatar
            key={user.userId}
            avatar={
              user.profilePicture ||
              user.picture ||
              user.stories?.[0]?.media?.url ||
              "/default-avatar.png"
            }
            owner={false}
            hasStory={user.stories?.length > 0}
            hasUnseenStories={!viewedUsers[user.userId]}
            onClick={() => setActiveIndex(index)}
          />
        ))}

        {showMyStory && myStory && (
  <ViewStory
    user={{
      ...myStory,
      id: myStory.userId,
      userId: myStory.userId,
      username: "Your Story",
      avatar: myProfilePicture,
    }}
    onClose={() => setShowMyStory(false)}
  />
)}

        {activeUser && (
          <ViewStory
            user={{
              ...activeUser,
              id: activeUser.userId,
              userId: activeUser.userId,
              username: `${activeUser.firstName || ""} ${
                activeUser.lastName || ""
              }`.trim(),
              avatar:
                activeUser.profilePicture ||
                activeUser.picture ||
                activeUser.stories?.[0]?.media?.url ||
                "/default-avatar.png",
            }}
            onClose={closeStories}
            onNextUser={markViewedAndGoNext}
          />
        )}
      </div>

      <CreateStory
        open={openCreateStory}
        onClose={() => setOpenCreateStory(false)}
      />
    </>
  );
}