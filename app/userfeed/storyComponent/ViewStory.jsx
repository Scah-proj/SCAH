"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Stories from "react-insta-stories";
import {
  useGetUserStoriesQuery,
  useGetFeedStoriesQuery,
  useViewStoryMutation,
  useDeleteStoryMutation,
  useArchiveStoryMutation,
} from "../../redux/api/storyApi";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";
import {
  Bookmark,
  MoreHorizontal,
  X,
  EyeOff,
  Eye,
  Trash2,
  Archive,
} from "lucide-react";

// Helper function to extract user IDs consistently
const getUserId = (obj) =>
  obj?._id || obj?.id || obj?.userId || obj?.user?._id || obj?.user?.id;

const extractArray = (...candidates) => {
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
};

// Checks whether a viewer object actually has usable profile data
const isPopulatedViewer = (viewer) => {
  if (!viewer || typeof viewer !== "object") return false;
  const v = viewer?.user || viewer;
  return Boolean(
    v?.name || v?.firstName || v?.lastName || v?.profilePicture || v?.avatar
  );
};

const hasPopulatedViews = (views) =>
  Array.isArray(views) && views.length > 0 && views.some(isPopulatedViewer);

const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".m4v"];
const isVideoStory = (story) => {
  const type = story?.media?.type || story?.type;
  if (type) return String(type).toLowerCase().startsWith("video");
  const url = story?.media?.url || story?.url || "";
  return VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));
};

// A story with no media file — content is the caption itself, styled
// with a background/text color.
const isTextStory = (story) => {
  const type = story?.media?.type || story?.type;
  return String(type).toLowerCase() === "text";
};

export default function ViewStory({
  isOwner: propIsOwner,
  user,
  onClose,
  onNextUser,
  onDeleteStory,
  onArchiveStory,
  onMuteUser,
}) {
  const myUser = useSelector((state) => state.auth?.user);
  const myId = getUserId(myUser);
  const targetUserId = getUserId(user);

  const { data: feedData, refetch: refetchFeed } = useGetFeedStoriesQuery();

  const {
    data: userStoriesData,
    isLoading,
    error,
    refetch,
  } = useGetUserStoriesQuery(targetUserId, { skip: !targetUserId });

  const { data: publicProfileData } = useGetPublicProfileQuery(targetUserId, {
    skip: !targetUserId,
  });

  const [viewStory] = useViewStoryMutation();
  const [deleteStoryMutation] = useDeleteStoryMutation();
  const [archiveStoryMutation, { isLoading: isArchiving }] =
    useArchiveStoryMutation();

  const [showViewers, setShowViewers] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [archivedStoryIds, setArchivedStoryIds] = useState(new Set());

  const menuRef = useRef(null);
  const storiesRef = useRef(null);
  const viewedStoryIdsRef = useRef(new Set());
  const previousStoriesLengthRef = useRef(0);

  const feedStories = useMemo(
    () => extractArray(feedData?.data?.stories, feedData?.stories, feedData?.data),
    [feedData]
  );

  const feedStoryListForUser = useMemo(() => {
    if (!feedStories.length || !targetUserId) return [];
    const match = feedStories.find(
      (item) => String(getUserId(item)) === String(targetUserId)
    );
    return Array.isArray(match?.stories) ? match.stories : [];
  }, [feedStories, targetUserId]);

  const userStories = useMemo(() => {
    const queryStories = extractArray(
      userStoriesData?.data?.stories,
      userStoriesData?.stories,
      userStoriesData?.data
    );

    if (queryStories.length > 0) {
      return queryStories.map((story) => {
        const storyId = story._id || story.id;
        const rawViews = story.viewers || story.views || [];

        if (hasPopulatedViews(rawViews)) return story;

        const feedStory = feedStoryListForUser.find(
          (fs) => (fs._id || fs.id) === storyId
        );

        if (feedStory?.views?.length && hasPopulatedViews(feedStory.views)) {
          return { ...story, views: feedStory.views };
        }

        return story;
      });
    }

    if (feedStoryListForUser.length > 0) return feedStoryListForUser;

    return user?.stories || [];
  }, [userStoriesData, feedStoryListForUser, user?.stories]);

  // Handle bounds cleanly when stories get removed or added
  useEffect(() => {
    if (userStories.length === 0) return;

    if (
      userStories.length > previousStoriesLengthRef.current &&
      previousStoriesLengthRef.current !== 0
    ) {
      setCurrentStoryIndex(0);
    } else if (currentStoryIndex >= userStories.length) {
      setCurrentStoryIndex(Math.max(0, userStories.length - 1));
    }

    previousStoriesLengthRef.current = userStories.length;
  }, [userStories.length, currentStoryIndex]);

  const stories = useMemo(() => {
    if (!Array.isArray(userStories)) return [];

    return userStories
      .filter(Boolean)
      .map((story, index) => {
        const src = story?.media?.url || story?.url || "";
        const storyKey =
          story?._id || story?.id || `story-${index}-${story?.createdAt || ""}`;

        return {
          key: storyKey,
          content: () => {
            if (isTextStory(story)) {
              const bg = story?.media?.backgroundColor || "#000000";
              const textColor = story?.media?.textColor || "#FFFFFF";
              const text = story?.caption || "";

              return (
                <div
                  className="w-full h-full relative flex items-center justify-center p-8"
                  style={{ backgroundColor: bg }}
                >
                  <p
                    className="text-center text-2xl font-semibold break-words whitespace-pre-wrap"
                    style={{ color: textColor }}
                  >
                    {text}
                  </p>
                </div>
              );
            }

            if (isVideoStory(story)) {
              return (
                <div className="w-full h-full relative bg-black">
                  <video
                    src={src}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted={false}
                    controls={false}
                  />
                </div>
              );
            }
            return (
              <div className="w-full h-full relative bg-black">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            );
          },
        };
      });
  }, [userStories]);

  // Synchronously calculate safe index to avoid out-of-bounds crash on render
  const safeIndex = useMemo(() => {
    if (!stories.length) return 0;
    return Math.min(Math.max(0, currentStoryIndex), stories.length - 1);
  }, [currentStoryIndex, stories.length]);

  const currentStory = userStories[safeIndex] || userStories[0];
  const activeStoryId = currentStory?._id || currentStory?.id;

  // Determine retained archive state from API data or local set
  const isArchived = useMemo(() => {
    if (!activeStoryId) return false;
    return Boolean(
      currentStory?.isArchived ||
        currentStory?.archived ||
        archivedStoryIds.has(activeStoryId)
    );
  }, [currentStory, activeStoryId, archivedStoryIds]);

  const viewers = useMemo(() => {
    return currentStory?.viewers || currentStory?.views || [];
  }, [currentStory]);

  const isOwner = useMemo(() => {
    const storyCreatorId =
      currentStory?.userId ||
      currentStory?.ownerId ||
      getUserId(currentStory?.user) ||
      getUserId(currentStory) ||
      targetUserId;

    if (myId && storyCreatorId) {
      return String(myId) === String(storyCreatorId);
    }

    return typeof propIsOwner === "boolean" ? propIsOwner : false;
  }, [propIsOwner, currentStory, targetUserId, myId]);

  const markStoryViewed = useCallback(
    (storyId) => {
      if (!storyId || isOwner) return;
      if (viewedStoryIdsRef.current.has(storyId)) return;
      viewedStoryIdsRef.current.add(storyId);
      viewStory(storyId);
    },
    [isOwner, viewStory]
  );

  useEffect(() => {
    if (userStories.length > 0 && activeStoryId) {
      markStoryViewed(activeStoryId);
    }
  }, [safeIndex, activeStoryId, markStoryViewed, userStories.length]);

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
    setSaved(false);
  }, [safeIndex]);

  const publicProfile =
    publicProfileData?.data || publicProfileData?.profile || publicProfileData;
  const storyUser = currentStory?.user || currentStory?.owner || user;

  const displayProfilePicture = useMemo(() => {
    return (
      publicProfile?.profilePicture ||
      publicProfile?.avatar ||
      publicProfile?.picture ||
      storyUser?.profilePicture ||
      storyUser?.avatar ||
      storyUser?.picture ||
      user?.profilePicture ||
      user?.avatar ||
      user?.picture ||
      "/default-avatar.png"
    );
  }, [publicProfile, storyUser, user]);

  const displayUsername = useMemo(() => {
    if (isOwner) return "Your Story";

    const possibleName =
      publicProfile?.username ||
      publicProfile?.name ||
      (publicProfile?.firstName
        ? `${publicProfile.firstName} ${publicProfile.lastName || ""}`.trim()
        : null) ||
      storyUser?.username ||
      storyUser?.name ||
      (storyUser?.firstName
        ? `${storyUser.firstName} ${storyUser.lastName || ""}`.trim()
        : null) ||
      user?.username ||
      user?.name ||
      (user?.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : null);

    return possibleName || "Story";
  }, [isOwner, publicProfile, storyUser, user]);

  useEffect(() => {
    if (!stories.length && !isLoading) {
      onClose();
    }
  }, [stories.length, isLoading, onClose]);

  if (isLoading && !userStories.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
        Loading stories...
      </div>
    );
  }

  if (error && !userStories.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
        Failed to load stories.
      </div>
    );
  }

  if (!stories.length || !stories[0]?.content) {
    return null;
  }

  const handleToggleViewers = (e) => {
    e.stopPropagation();
    const nextState = !showViewers;
    setShowViewers(nextState);
    if (nextState) {
      refetch();
    }
  };

  const handleDelete = async () => {
    setShowMenu(false);
    if (!activeStoryId) return;

    if (onDeleteStory) {
      onDeleteStory(activeStoryId);
    } else {
      try {
        await deleteStoryMutation(activeStoryId).unwrap();
        refetch();
        refetchFeed();
        if (userStories.length <= 1) {
          onClose();
        }
      } catch (err) {
        console.error("Failed to delete story:", err);
      }
    }
  };

  const handleArchive = async () => {
    setShowMenu(false);
    if (!activeStoryId || isArchived) return;

    setArchivedStoryIds((prev) => new Set(prev).add(activeStoryId));

    if (onArchiveStory) {
      onArchiveStory(activeStoryId);
    } else {
      try {
        await archiveStoryMutation(activeStoryId).unwrap();
        await Promise.all([refetch(), refetchFeed()]);

        if (userStories.length <= 1) {
          onClose();
        } else {
          setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
      } catch (err) {
        setArchivedStoryIds((prev) => {
          const next = new Set(prev);
          next.delete(activeStoryId);
          return next;
        });
        console.error("Failed to archive story:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-black w-full h-full sm:w-[420px] sm:h-[740px] sm:rounded-xl overflow-hidden">
        <Stories
          key={`stories-${targetUserId}-${stories.length}`}
          ref={storiesRef}
          stories={stories}
          currentIndex={safeIndex}
          isPaused={showMenu || showViewers || isArchiving}
          defaultInterval={4000}
          width="100%"
          height="100%"
          onStoryStart={(story, index) => {
            const resolvedIndex = typeof story === "number" ? story : index;
            if (resolvedIndex !== undefined && userStories[resolvedIndex]) {
              setCurrentStoryIndex(resolvedIndex);
              setShowViewers(false);
              const idToMark =
                userStories[resolvedIndex]._id || userStories[resolvedIndex].id;
              markStoryViewed(idToMark);
            }
          }}
          onAllStoriesEnd={() => {
            setTimeout(() => {
              if (onNextUser) {
                onNextUser();
              } else {
                onClose();
              }
            }, 0);
          }}
        />

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[9999] pointer-events-auto text-xl text-white cursor-pointer hover:text-gray-300 transition"
        >
          ✕
        </button>

        {/* Header Overlay */}
        <div className="absolute top-4 left-4 right-14 pointer-events-none flex items-center justify-between z-[9999]">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={displayProfilePicture}
              alt={displayUsername}
              className="w-10 h-10 shrink-0 pointer-events-auto rounded-full border border-white object-cover"
            />
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {displayUsername}
              </p>
              <p className="text-gray-300 text-xs">
                {currentStory?.createdAt &&
                  new Date(currentStory.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Context Options Menu */}
          <div className="relative pointer-events-auto" ref={menuRef}>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="More options"
              className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
            >
              <MoreHorizontal className="w-4 h-4 text-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-11 w-48 bg-neutral-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                {isOwner ? (
                  <>
                    <button
                      onClick={handleArchive}
                      disabled={isArchiving || isArchived}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                        isArchived
                          ? "text-teal-400 cursor-default opacity-90"
                          : "text-white hover:bg-white/10 disabled:opacity-50"
                      }`}
                    >
                      <Archive
                        className={`w-4 h-4 ${
                          isArchived ? "fill-teal-400 text-teal-400" : ""
                        }`}
                      />
                      {isArchiving
                        ? "Archiving..."
                        : isArchived
                        ? "Archived"
                        : "Archive story"}
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete story
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      if (targetUserId) {
                        onMuteUser?.(targetUserId);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                  >
                    <EyeOff className="w-4 h-4" />
                    Mute for 24 hours
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10">
          {currentStory?.caption && !isTextStory(currentStory) && (
            <p className="text-white text-sm px-5 pb-3 pointer-events-auto line-clamp-3">
              {currentStory.caption}
            </p>
          )}

          <div
            className={`flex items-center px-4 pb-4 pt-1 ${
              isOwner ? "justify-between" : "justify-end"
            }`}
          >
            {isOwner && (
              <button
                type="button"
                onClick={handleToggleViewers}
                className="flex items-center gap-2 pointer-events-auto rounded-full bg-black/60 border border-white/20 px-4 py-2 text-sm text-white backdrop-blur cursor-pointer hover:bg-black/80 transition active:scale-95"
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>
                  {viewers.length} {viewers.length === 1 ? "view" : "views"}
                </span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSaved((prev) => !prev);
              }}
              aria-label={saved ? "Remove from saved" : "Save story"}
              className="pointer-events-auto rounded-full bg-black/60 border border-white/20 p-2.5 text-white backdrop-blur hover:bg-black/80 transition active:scale-95"
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Viewers Drawer */}
        {isOwner && showViewers && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 z-[10000] max-h-[60%] bg-neutral-950/95 backdrop-blur rounded-t-2xl border-t border-white/10 flex flex-col animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10">
              <h3 className="text-white font-semibold text-sm">
                {viewers.length} {viewers.length === 1 ? "View" : "Views"}
              </h3>
              <button
                onClick={() => setShowViewers(false)}
                aria-label="Close viewers list"
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-2">
              {viewers.length > 0 ? (
                viewers.map((viewer, idx) => {
                  const viewerObj = viewer?.user || viewer;
                  const name =
                    viewerObj?.username ||
                    viewerObj?.name ||
                    `${viewerObj?.firstName || ""} ${
                      viewerObj?.lastName || ""
                    }`.trim() ||
                    "User";

                  const avatar =
                    viewerObj?.profilePicture ||
                    viewerObj?.avatar ||
                    viewerObj?.picture ||
                    "/default-avatar.png";

                  return (
                    <div
                      key={getUserId(viewerObj) ?? idx}
                      className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                    >
                      <img
                        src={avatar}
                        alt={name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10"
                      />
                      <p className="text-white text-sm font-medium truncate">
                        {name}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm text-center py-6">
                  No viewers yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}