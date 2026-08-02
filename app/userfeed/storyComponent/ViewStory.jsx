"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Stories from "react-insta-stories";
import {
  useGetUserStoriesQuery,
  useViewStoryMutation,
} from "../../redux/api/storyApi";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";
import { Bookmark, MoreHorizontal, X, Flag, Link2, EyeOff,Eye,  Trash2 } from "lucide-react";

export default function ViewStory({ user, onClose, onNextUser }) {
  const { data, isLoading, error, refetch } = useGetUserStoriesQuery(
    user?.userId,
    { skip: !user?.userId }
  );

  const { data: publicProfile } = useGetPublicProfileQuery(user?.userId, {
    skip: !user?.userId,
  });

  const [viewStory] = useViewStoryMutation();
  const [showViewers, setShowViewers] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const menuRef = useRef(null);
  const storiesRef = useRef(null);

  const userStories = data?.data?.stories || [];
  const currentStory = userStories[currentStoryIndex];
  const viewers = currentStory?.viewers || [];

  useEffect(() => {
    if (userStories.length > 0) {
      viewStory(userStories[0]._id);
    }
  }, [userStories, viewStory]);

  // Close the "more" menu on outside click
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

  // Reset transient UI state when the story changes
  useEffect(() => {
    setShowMenu(false);
    setSaved(false);
  }, [currentStoryIndex]);

  

  const profilePicture =
    publicProfile?.profile?.profilePicture ||
    publicProfile?.profilePicture ||
    user.profilePicture ||
    user.picture ||
    "/default-avatar.png";

  const stories = useMemo(() => {
    return userStories.map((story) => ({
      key: story._id,
      content: () => (
        <div className="w-full h-full relative bg-black">
          <img
            src={story.media?.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ),
    }));
  }, [userStories]);

  useEffect(() => {
    if (!stories.length && !isLoading) {
      onClose();
    }
  }, [stories.length, isLoading, onClose]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-black w-full h-full sm:w-[420px] sm:h-[740px] sm:rounded-xl overflow-hidden">
        <Stories
          ref={storiesRef}
          stories={stories}
          isPaused={showMenu || showViewers}
          defaultInterval={4000}
          width="100%"
          height="100%"
          onStoryStart={(story, index) => {
            if (!userStories[index]) return;
            setCurrentStoryIndex(index);
            setShowViewers(false);
            viewStory(userStories[index]._id);
          }}
          onAllStoriesEnd={() => {
            if (onNextUser) {
              onNextUser();
            } else {
              onClose();
            }
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[9999] pointer-events-auto text-xl text-white cursor-pointer hover:text-gray-300 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="absolute top-4 left-4 right-14 pointer-events-none flex items-center justify-between z-[9999]">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={profilePicture}
              alt="avatar"
              className="w-10 h-10 shrink-0 pointer-events-auto rounded-full border border-white object-cover"
            />
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
              </p>
              <p className="text-gray-300 text-xs">
                {currentStory?.createdAt &&
                  new Date(currentStory.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* More menu */}
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
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                >
                  <Link2 className="w-4 h-4" />
                  Copy link
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                >
                  <EyeOff className="w-4 h-4" />
                  Mute for 24 hours
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition"
                >
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer: caption + action bar share one gradient, stacked so they never overlap */}
        <div className="absolute bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10">
          {currentStory?.caption && (
            <p className="text-white text-sm px-5 pb-3 pointer-events-auto line-clamp-3">
              {currentStory.caption}
            </p>
          )}

          <div className="flex items-center justify-between px-4 pb-4 pt-1">
            <button
              type="button"
              onClick={() => {
                setShowViewers((prev) => !prev);
                refetch();
              }}
              className="flex items-center gap-2 pointer-events-auto rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur cursor-pointer hover:bg-black/70 transition"
            >
              <Eye className="w-4 h-4" /> {viewers.length} {viewers.length === 1 ? "view" : "views"}
            </button>

            <button
              onClick={() => setSaved((prev) => !prev)}
              aria-label={saved ? "Remove from saved" : "Save story"}
              className="pointer-events-auto rounded-full bg-black/50 p-2.5 text-white backdrop-blur hover:bg-black/70 transition"
            >
              <Bookmark
                className={`w-4 h-4 ${saved ? "fill-white" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Viewers panel */}
        {showViewers && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 z-[9999] max-h-[60%] bg-neutral-950/95 backdrop-blur rounded-t-2xl border-t border-white/10 flex flex-col animate-in slide-in-from-bottom duration-200"
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
                viewers.map((viewer) => (
                  <div
                    key={viewer._id}
                    className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                  >
                    <img
                      src={viewer.profilePicture || "/default-avatar.png"}
                      alt={viewer.name || "viewer"}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {viewer.name ||
                          `${viewer.firstName || ""} ${
                            viewer.lastName || ""
                          }`.trim()}
                      </p>
                      {viewer.username && (
                        <p className="text-xs text-gray-400 truncate">
                          @{viewer.username}
                        </p>
                      )}
                    </div>
                  </div>
                ))
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