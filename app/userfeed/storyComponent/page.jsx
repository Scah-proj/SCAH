"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import StoryAvatar from "./StoryAvatar";
import ViewStory from "./ViewStory";
import CreateStory from "./CreateStory";

import {
  useGetFeedStoriesQuery,
  useGetUserStoriesQuery,
} from "../../redux/api/storyApi";
import { useGetMyProfileQuery } from "../../redux/api/profileApi";

import {
  setFeedStories,
  setLoadingFeedStories,
  setFeedStoriesError,
} from "../../redux/features/story/storySlice";

// Helper function to resolve IDs consistently across different API response formats
const getUserId = (obj) =>
  obj?._id || obj?.id || obj?.userId || obj?.user?._id || obj?.user?.id;

// Centralized helper for pulling an array out of an API response, regardless
// of which shape the backend happened to wrap it in. Pass candidates in
// priority order; the first one that is actually an array wins.
const extractArray = (...candidates) => {
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
};

export default function StoryComponent() {
  const dispatch = useDispatch();

  // Track the *user id* of the open story, not an index. Indexes drift if
  // `otherUsers` reorders or shrinks (e.g. after a refetch) while a story is
  // open; an id is stable across re-renders of the underlying list.
  const [activeUserId, setActiveUserId] = useState(null);
  const [viewedUsers, setViewedUsers] = useState({});
  const [openCreateStory, setOpenCreateStory] = useState(false);
  const [showMyStory, setShowMyStory] = useState(false);

  // 1. Logged-in user profile
  const { data: myProfileData } = useGetMyProfileQuery();

  const myProfile = useMemo(() => {
    return myProfileData?.data?.user || myProfileData?.data || myProfileData?.user || myProfileData;
  }, [myProfileData]);

  const myId = getUserId(myProfile);

  // 2. Fetch logged-in user's own stories separately
  const {
    data: myStoriesData,
    refetch: refetchMyStories,
  } = useGetUserStoriesQuery(myId, { skip: !myId });

  // 3. Fetch feed stories (other users)
  const {
    data: feedData,
    isLoading: feedLoading,
    error: feedError,
    refetch: refetchFeed,
  } = useGetFeedStoriesQuery();

  const users = useSelector((state) => state.story.feedStories) || [];

  // Extract own stories array safely
  const myStoriesList = useMemo(
    () => extractArray(myStoriesData?.data?.stories, myStoriesData?.stories, myStoriesData?.data),
    [myStoriesData]
  );

  const hasMyStories = myStoriesList.length > 0;

  // Filter out self from feed array if present
  const otherUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.filter((u) => getUserId(u) && String(getUserId(u)) !== String(myId));
  }, [users, myId]);

  useEffect(() => {
    dispatch(setLoadingFeedStories(feedLoading));
  }, [feedLoading, dispatch]);

  useEffect(() => {
    const storiesList = extractArray(feedData?.data?.stories, feedData?.stories, feedData?.data);
    if (storiesList.length) {
      dispatch(setFeedStories(storiesList));
    }
  }, [feedData, dispatch]);

  useEffect(() => {
    if (feedError) {
      dispatch(setFeedStoriesError(feedError));
    }
  }, [feedError, dispatch]);

  const activeIndex = useMemo(() => {
    if (activeUserId === null) return -1;
    return otherUsers.findIndex((u) => String(getUserId(u)) === String(activeUserId));
  }, [otherUsers, activeUserId]);

  const activeUser = activeIndex !== -1 ? otherUsers[activeIndex] : null;

  // If the active user drops out of the feed entirely (e.g. refetch removed
  // them), close the viewer instead of silently showing stale data.
  useEffect(() => {
    if (activeUserId !== null && activeIndex === -1) {
      setActiveUserId(null);
    }
  }, [activeUserId, activeIndex]);

  const closeStories = () => {
    setActiveUserId(null);
  };

  const goToNextUser = () => {
    if (activeIndex === -1) return;
    const next = otherUsers[activeIndex + 1];
    setActiveUserId(next ? getUserId(next) : null);
  };

  const markViewedAndGoNext = () => {
    if (activeUser) {
      const activeUserIdVal = getUserId(activeUser);
      setViewedUsers((prev) => ({
        ...prev,
        [activeUserIdVal]: true,
      }));
    }
    // No setTimeout needed here: this is invoked from an event/callback
    // (never during render), and goToNextUser only touches local state.
    goToNextUser();
  };

  const myProfilePicture =
    myProfile?.profile?.profilePicture ||
    myProfile?.profile?.media?.profilePicture ||
    myProfile?.profilePicture ||
    myProfile?.avatar ||
    "/default-avatar.png";

  const myUsername =
    `${myProfile?.firstName || ""} ${myProfile?.lastName || ""}`.trim() ||
    myProfile?.username ||
    "Your Story";

  if (feedLoading && !users.length) {
    return (
      <div className="flex p-3 space-x-4 overflow-x-auto">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-600 animate-spin"></div>
      </div>
    );
  }

  if (feedError && !users.length) {
    return (
      <div className="flex p-3 space-x-4 overflow-x-auto">
        <p className="text-sm text-red-500">Failed to load stories.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex space-x-4 p-3 overflow-x-auto no-scrollbar">
        {/* Logged-in User's Story Avatar */}
        <StoryAvatar
          owner={true}
          onAddStory={() => setOpenCreateStory(true)}
          hasStory={hasMyStories}
          hasUnseenStories={false}
          avatar={myProfilePicture}
          onClick={() => {
            if (hasMyStories) {
              setShowMyStory(true);
            } else {
              setOpenCreateStory(true);
            }
          }}
        />

        {/* Other Users' Feed Avatars */}
        {otherUsers.map((user, index) => {
          const userId = getUserId(user);
          return (
            <StoryAvatar
              key={userId || index}
              avatar={
                user.profilePicture ||
                user.picture ||
                user.stories?.[0]?.media?.url ||
                "/default-avatar.png"
              }
              owner={false}
              hasStory={user.stories?.length > 0}
              hasUnseenStories={!viewedUsers[userId]}
              onClick={() => setActiveUserId(userId)}
            />
          );
        })}

        {/* 1. VIEW OWN STORY (Explicitly passes isOwner={true}) */}
        {showMyStory && hasMyStories && (
          <ViewStory
            isOwner={true}
            user={{
              _id: myId,
              id: myId,
              userId: myId,
              firstName: myProfile?.firstName,
              lastName: myProfile?.lastName,
              username: myUsername,
              profilePicture: myProfilePicture,
              stories: myStoriesList,
            }}
            onClose={() => setShowMyStory(false)}
          />
        )}

        {/* 2. VIEW FEED STORIES (Explicitly passes isOwner={false}) */}
        {activeUser && (
          <ViewStory
            isOwner={false}
            user={{
              ...activeUser,
              _id: getUserId(activeUser),
              id: getUserId(activeUser),
              userId: getUserId(activeUser),
              profilePicture:
                activeUser.profilePicture ||
                activeUser.picture ||
                "/default-avatar.png",
            }}
            onClose={closeStories}
            onNextUser={markViewedAndGoNext}
          />
        )}
      </div>

      {/* Modal to Create/Post standard stories */}
      <CreateStory
        open={openCreateStory}
        onClose={() => {
          setOpenCreateStory(false);
          refetchMyStories();
          refetchFeed();
        }}
      />
    </>
  );
}