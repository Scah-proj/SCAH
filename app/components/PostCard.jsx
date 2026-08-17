"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Copy,
  User,
  MoreHorizontalIcon,
  Check,
  ImageDown,
  Trash2,
} from "lucide-react";
import PostComments from "./comment/CommentSection";
import { useCommentStore } from "../../lib/commentStore";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { timeAgo } from "../../components/timeAgo";
import toast from "react-hot-toast";
import { 
  useToggleLikePostMutation, 
  useToggleSavePostMutation,
  useToggleRepostMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeletePostMutation,
} from "../redux/api/feedApi";
import { useGetPublicProfileQuery } from "../redux/api/profileApi";
import {
  setLikingPost,
  setLikePostSuccess,
  setLikePostError,
  setSavingPost,
  setSavePostSuccess,
  setSavePostError,
  setRepostingPost,
  setRepostPostSuccess,
  setRepostPostError,
  setDeletingPost,
  setDeletePostSuccess,
  setDeletePostError,
} from "../redux/features/feed/feedSlice";




const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toBoolean = (value) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }

  return Boolean(value);
};

const getUserId = (user) => user?._id || user?.id || user?.user_id;

const hasCurrentUserLiked = (post, currentUserId) => {
  const explicitLikeState =
    post.hasLiked ??
    post.has_liked ??
    post.liked ??
    post.isLiked ??
    post.is_liked ??
    post.viewerHasLiked ??
    post.viewer_has_liked ??
    post.userHasLiked ??
    post.user_has_liked ??
    post.likes?.hasLiked ??
    post.likes?.has_liked ??
    post.likes?.isLiked ??
    post.likes?.is_liked;

  if (explicitLikeState !== undefined && explicitLikeState !== null) {
    return toBoolean(explicitLikeState);
  }

  if (!currentUserId) return false;

  const likerIds =
    post.likedBy ??
    post.liked_by ??
    post.likerIds ??
    post.liker_ids ??
    post.likes?.users ??
    post.likes?.userIds ??
    post.likes?.user_ids ??
    (Array.isArray(post.likes) ? post.likes : undefined) ??
    [];

  return Array.isArray(likerIds) && likerIds.some((liker) =>
    String(typeof liker === "object" ? getUserId(liker) : liker) === String(currentUserId)
  );
};

export default function PostCard({ post }) {
  const [currentMedia, setCurrentMedia] = useState(0);
useEffect(() => {
  setCurrentMedia(0);
}, [post._id]);


  if (!post) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  const dispatch = useDispatch();

  // API Hooks
  const [toggleLikePost] = useToggleLikePostMutation();
  const [toggleSavePost] = useToggleSavePostMutation();
  const [toggleRepost] = useToggleRepostMutation();
  const [addComment] = useAddCommentMutation();
  const [deletePost] = useDeletePostMutation();
  
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = getUserId(currentUser);

  const postId = post.id || post._id || post.postId;

  const authorId =
    post.author?._id ||
    post.author?.id ||
    post.user_id;

  // Check if current user is the owner of this post
  const isOwner = Boolean(
    currentUserId && authorId && String(currentUserId) === String(authorId)
  );

  // A post fetched from the API is "deleted" if the backend's soft-delete
  // flag says so. Different endpoints may surface this under different
  // field names, so check the common variants.
  const isDeleted = Boolean(
    post.is_active === false ||
    post.isDeleted === true ||
    post.deleted === true ||
    post.is_deleted === true
  );

  const { data: authorProfileData } = useGetPublicProfileQuery(authorId, {
    skip: !authorId,
  });

  const handleAvatarClick = (e) => {
    e.stopPropagation();

    if (isOwner) {
      router.push(`/profile`);
      return;
    }

    if (authorId) {
      router.push(`/profile/${authorId}`);
    }
  };

  const handleOpenPost = () => {
    if (postId) {
      router.push(`/profile/Posts/${postId}`);
    }
  };

  const [showComments, setShowComments] = useState(false);
  // Run the comments query on mount (not only when comments are toggled open)
  // so the comment count is available immediately on the postcard. We still
  // avoid fetching for deleted posts or when there is no post id.
  const { data: commentsData, isLoading: isLoadingComments } = useGetCommentsQuery(postId, {
    skip: !postId || isDeleted,
  });

  const initialLikesCount =
    post.likesCount ??
    post.likes?.count ??
    post.likes?.total ??
    (Array.isArray(post.likes) ? post.likes.length : undefined) ??
    (typeof post.likes === "number" ? post.likes : 0);
  const initialLiked = hasCurrentUserLiked(post, currentUserId);
  const initialCommentCount =
    post.commentsCount ??
    post.commentCount ??
    post.comments?.count ??
    post.comments?.total ??
    (Array.isArray(post.comments) ? post.comments.length : 0);

  const initialRepostsCount =
    post.repostsCount ??
    post.repostCount ??
    post.reposts?.count ??
    post.reposts?.total ??
    (Array.isArray(post.reposts) ? post.reposts.length : undefined) ??
    (typeof post.reposts === "number" ? post.reposts : 0);

  const initialReposted = toBoolean(
    post.hasReposted ??
    post.has_reposted ??
    post.reposted ??
    post.isReposted ??
    post.is_reposted
  );

  const [likes, setLikes] = useState(initialLikesCount);
  const [liked, setLiked] = useState(initialLiked);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [reposts, setReposts] = useState(initialRepostsCount);
  const [reposted, setReposted] = useState(initialReposted);
  const [saved, setSaved] = useState(!!(post.hasSaved || post.saved || post.isSaved));
  
  
  const [isCopied, setIsCopied] = useState(false);
  const [hasAvatarError, setHasAvatarError] = useState(false);

  useEffect(() => {
    setLikes(initialLikesCount);
    setLiked(initialLiked);
    setCommentCount(initialCommentCount);
    setReposts(initialRepostsCount);
    setReposted(initialReposted);
  }, [initialCommentCount, initialLiked, initialLikesCount, initialRepostsCount, initialReposted, postId]);

  // Name to fall back to when author data is missing/unpopulated on a
  // deleted post. Since only the post's own owner can delete it, it's
  // safe to assume the logged-in user is the author in that case.
  const currentUserName =
    currentUser?.name ||
    `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim() ||
    null;

  const authorName = (() => {
    if (typeof post.author === "string" && post.author.trim()) {
      return post.author;
    }
    if (post.author && typeof post.author === "object") {
      const fullName = `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim();
      if (fullName) return fullName;
    }
    // Only trust the current-user fallback when the post is confirmed
    // deleted (and therefore, given delete permissions, owned by them).
    if (isDeleted && currentUserName) {
      return currentUserName;
    }
    return "Unknown";
  })();

  const authorIsVerified =
    typeof post.author === "object" && post.author?.isVerified;

  const fetchedAuthorPicture =
    authorProfileData?.profile?.profilePicture ||
    authorProfileData?.profile?.media?.profilePicture;

  const authorAvatarSrc =
    (typeof post.authorAvatar === "string" && post.authorAvatar) ||
    (typeof post.author === "object" &&
      (post.author?.picture || post.author?.avatar)) ||
    fetchedAuthorPicture;

  const taggedUsers = Array.isArray(post.taggedUsers)
    ? post.taggedUsers
    : Array.isArray(post.tagged_users)
      ? post.tagged_users
      : [];

  const taggedUserIds = new Set(
    taggedUsers
      .map((user) => (typeof user === "string" ? user : user?._id || user?.id))
      .filter(Boolean)
  );

  const taggedUserNames = taggedUsers
    .map((user) => {
      if (!user || typeof user === "string") return null;

      return [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.name ||
        user.username ||
        null;
    })
    .filter(Boolean);

  const renderCaption = (caption) => {
    const names = taggedUserNames.map((name) => `@${name}`);
    const pattern = names.length
      ? new RegExp(`(${names.map(escapeRegExp).join("|")})`, "gi")
      : /(@[A-Za-z0-9_]+)/g;
    const mentionNames = new Set(names.map((name) => name.toLowerCase()));

    return String(caption).split(pattern).map((part, index) => {
      const isTaggedName = mentionNames.has(part.toLowerCase()) ||
        (!names.length && /^@[A-Za-z0-9_]+$/.test(part));

      return isTaggedName ? (
        <span key={index} className="font-medium text-teal-600">
          {part}
        </span>
      ) : part;
    });
  };

  const displayTags = (Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === "string"
      ? post.tags.split(",")
      : []
  ).filter((tag) => {
    const value = String(tag).trim();
    const looksLikeUserId = /^(?:[a-f\d]{24}|[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12})$/i.test(value);

    return value && !taggedUserIds.has(value) && !looksLikeUserId;
  });

  const primaryImageMedia = Array.isArray(post.media)
    ? post.media.find((m) => m?.mimetype?.startsWith("image/") && m?.url)
    : null;
  const hasImage = Boolean(primaryImageMedia);

  const rawComments = commentsData?.data?.comments || [];
  
  const commentsList = rawComments.map((comment) => {
    const user = comment?.user;
    const fullName = user
      ? user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "Unknown User";

    return {
      id: comment.id,
      postId: comment.post_id,
      userId: comment.user_id,
      content: comment.content,
      text: comment.content, 
      author: fullName,      
      isActive: comment.is_active,
      createdAt: comment.created_at,
      user: user
        ? {
            id: user._id || user.id || comment.user_id, 
            firstName: user.firstName,
            lastName: user.lastName,
            name: fullName,
            
            picture: user.picture || user.avatar || null,
            avatar: user.picture || user.avatar || null,
          }
        : null,
    };
  });

  const commentsByPost = useCommentStore(state => state.commentsByPost);
  
  const loadedCommentCount = commentsList.length;
  const localCommentCount = (commentsByPost[postId] || []).length;
  const displayedCommentCount = Math.max(
    commentCount,
    loadedCommentCount,
    localCommentCount
  );

  // Copy Link Handler
  const handleCopyLink = async (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();

    const postUrl = `${window.location.origin}/profile/Posts/${postId}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy post link:", err);
    }
  };

  // Delete Post Handler — a native window.confirm() blocks the whole page
  // and looks jarring next to the rest of the UI, so the confirmation step
  // is a toast with inline action buttons instead. react-hot-toast doesn't
  // have sonner's built-in action/cancel options, so the confirmation is
  // rendered as custom JSX inside the toast, dismissed via toast.dismiss.
  const handleDeletePost = (e) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (!postId) return;

    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Delete this post?</p>
          <p className="text-xs text-gray-500">This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-1">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-xs px-3 py-1 rounded-full border text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                dispatch(setDeletingPost(true));
                try {
                  await deletePost(postId).unwrap();
                  dispatch(setDeletePostSuccess(true));
                  toast.success("Post deleted");
                } catch (err) {
                  const message =
                    err?.data?.message || err?.message || "Failed to delete post";
                  console.error("Failed to delete post:", err);
                  dispatch(setDeletePostError(message));
                  toast.error(message);
                } finally {
                  dispatch(setDeletingPost(false));
                }
              }}
              className="text-xs px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleDownloadImage = async (e) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (!primaryImageMedia?.url) return;

    try {
      const response = await fetch(primaryImageMedia.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const fileName =
        primaryImageMedia.path?.split("/").pop() || `post-${postId}.jpg`;

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (!postId || isDeleted) return;

    const previousLiked = liked;
    const previousLikesCount = likes;

    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
    dispatch(setLikingPost(true));

    try {
      const res = await toggleLikePost(postId).unwrap();
      if (res?.success && res?.data) {
        setLiked(toBoolean(
          res.data.liked ??
          res.data.hasLiked ??
          res.data.has_liked ??
          res.data.isLiked ??
          res.data.is_liked
        ));
        setLikes(res.data.count ?? res.data.likesCount ?? res.data.likes ?? likes);
      }
      dispatch(setLikePostSuccess(true));
    } catch (err) {
      setLiked(previousLiked);
      setLikes(previousLikesCount);
      dispatch(setLikePostError(err?.data?.message || err?.message || "Failed to like post"));
    } finally {
      dispatch(setLikingPost(false));
    }
  };

  const handleRepostClick = async (e) => {
    e.stopPropagation();
    if (!postId || isDeleted) {
      return;
    }

    const previousReposted = reposted;
    const previousRepostsCount = reposts;

    setReposts(reposted ? Math.max(0, reposts - 1) : reposts + 1);
    setReposted(!reposted);
    dispatch(setRepostingPost(true));

    try {
      const res = await toggleRepost(postId).unwrap();
      if (res?.success && res?.data) {
        setReposted(toBoolean(
          res.data.reposted ??
          res.data.hasReposted ??
          res.data.has_reposted ??
          res.data.isReposted ??
          res.data.is_reposted
        ));
        setReposts(
          res.data.count ??
          res.data.repostsCount ??
          res.data.repostCount ??
          res.data.reposts ??
          reposts
        );
      }
      dispatch(setRepostPostSuccess(true));
    } catch (err) {
      console.error("Failed to toggle repost:", err);
      setReposted(previousReposted);
      setReposts(previousRepostsCount);
      dispatch(setRepostPostError(err?.data?.message || err?.message || "Failed to repost"));
    } finally {
      dispatch(setRepostingPost(false));
    }
  };

  const handleSaveClick = async (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (!postId || isDeleted) return;

    const previousSaved = saved;
    setSaved(!saved);
    dispatch(setSavingPost(true));

    try {
      const res = await toggleSavePost(postId).unwrap();
      if (res?.success && res?.data) {
        setSaved(res.data.saved);
      }
      dispatch(setSavePostSuccess(true));
    } catch (err) {
      setSaved(previousSaved);
      dispatch(setSavePostError(err?.data?.message || err?.message || "Failed to save post"));
    } finally {
      dispatch(setSavingPost(false));
    }
  };

  const handleCommentAdded = async (content) => {
    if (!postId || isDeleted) return;
    try {
      const res = await addComment({ postId, content }).unwrap();
      const nextCount =
        res?.data?.commentsCount ??
        res?.data?.commentCount ??
        res?.data?.count ??
        res?.commentsCount ??
        res?.commentCount;

      setCommentCount((current) =>
        Number.isFinite(Number(nextCount))
          ? Math.max(Number(nextCount), current + 1)
          : current + 1
      );
      return res; 
    } catch (err) {
      console.error("Failed to post comment:", err);
      throw err;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div 
        onClick={handleOpenPost} 
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl mb-2 transition hover:shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              onClick={handleAvatarClick}
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100 cursor-pointer"
            >
              {authorAvatarSrc && !hasAvatarError ? (
                <Image
                  src={authorAvatarSrc}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  onError={() => setHasAvatarError(true)}
                />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div
              onClick={handleAvatarClick}
              className="cursor-pointer"
            >
              <h3 className="text-sm font-semibold text-gray-900">
                {authorName}{authorIsVerified ? " ✓" : ""} •  
                <span className={`text-xs mx-2 font-semibold ${isDeleted ? "text-red-500" : "text-teal-600"}`}>
                  {isDeleted ? "Deleted" : post.status || "Active"}
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                {post.sport} • {post.position}
              </p>
            </div>
          </div>

          {/* "..." menu hidden entirely once the post is deleted */}
          {!isDeleted && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" aria-label="Open menu" size="icon-sm">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              {/* stopPropagation here, not just on the trigger: Radix
                  portals this content elsewhere in the DOM, but React still
                  bubbles the synthetic click event up the *component* tree
                  (this element is still a JSX child of the card's outer
                  onClick={handleOpenPost} div). Without this, clicking any
                  item inside the menu — Save, Copy link, Delete, etc. — was
                  also triggering navigation to the post page. */}
              <DropdownMenuContent
                className="w-40"
                align="end"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={handleSaveClick}>
                    <Bookmark/>
                    Save
                  </DropdownMenuItem>

                  {hasImage && (
                    <DropdownMenuItem onSelect={handleDownloadImage}>
                      <ImageDown/>
                      Save to Camera Roll
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onSelect={handleCopyLink}>
                    {isCopied ? <Check className="text-teal-600" /> : <Copy />}
                    {isCopied ? "Copied!" : "Copy link to post"}
                  </DropdownMenuItem>

                  {/* SHOW DELETE ONLY FOR POST OWNER */}
                  {isOwner && (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e?.stopPropagation?.();
                        handleDeletePost(e);
                      }}
                      className="text-red-600"
                    >
                      <Trash2 color="red" />
                      Delete post
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="px-4 pb-2">
            <p className="text-base text-gray-900">
              {renderCaption(post.caption)}
            </p>
          </div>
        )}

        {/* Hashtags */}
        {displayTags.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {displayTags.map((tag, i) => (
              <span
                key={i}
                className="text-sm text-teal-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Media */}

{post.media?.length > 0 && (
  <div className="relative">
    {/* Carousel */}
    <div
      className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      onScroll={(e) => {
        const index = Math.round(
          e.currentTarget.scrollLeft / e.currentTarget.clientWidth
        );
        setCurrentMedia(index);
      }}
    >
      {post.media.map((media, index) => (
        <div
          key={index}
          className="relative w-full aspect-square shrink-0 snap-center bg-gray-100"
        >
          {media.mimetype?.startsWith("image/") ? (
            <Image
              src={media.url}
              alt={`Post ${index + 1}`}
              fill
              className="object-cover"
            />
          ) : media.mimetype?.startsWith("video/") ? (
            <video
              src={media.url}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-center justify-center"
            >
              Open attachment
            </a>
          )}
        </div>
      ))}
    </div>

    {/* Counter */}
    {post.media.length > 1 && (
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
        {currentMedia + 1}/{post.media.length}
      </div>
    )}

    {/* Dots */}
    {post.media.length > 1 && (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {post.media.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition ${
              index === currentMedia
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    )}
  </div>
)}

        {/* Actions */}
        {!isDeleted && (
          <div
            className="flex items-center justify-between px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-5">
              {/* Like */}
              <div className="flex items-center">    
                <button className="flex space-y-1 mr-1 cursor-pointer" onClick={handleLikeClick}>
                  <Heart
                    size={22}
                    className={`transition ${
                      liked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>
                <span>
                  {likes > 0 && <span>{likes}</span>}
                </span>
              </div>

              {/* Comment */}
              <div className="flex items-center">
               <button
                className="flex space-y-1 mr-1 cursor-pointer"
                onClick={() => setShowComments((prev) => !prev)}
              >
                <MessageCircle
                  size={22}
                  className="text-gray-600 hover:text-teal-600"
                />
              </button>
                <span>{displayedCommentCount > 0 && <span>{displayedCommentCount}</span>}</span>
              </div>

              {/* Repost */}
              <div className="flex items-center">
                <button className="flex space-y-1 mr-1 cursor-pointer" onClick={handleRepostClick}>
                  <Repeat2
                    size={22}
                    className={`transition ${
                      reposted
                        ? "text-teal-500"
                        : "text-gray-600 hover:text-teal-500"
                    }`}
                  />
                </button>
                <span>{reposts > 0 && <span>{reposts}</span>}</span>
              </div>

            </div>

            {/* Save */}
            <button onClick={handleSaveClick}>
              <Bookmark
                size={22}
                className={`transition ${
                  saved
                    ? "fill-gray-900 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              />
            </button>
          </div>
        )}

        <div className="text-xs text-gray-500 px-4 mb-2">
          {timeAgo(post.created_at || post.createdAt)}
        </div>
            
        {showComments && !isDeleted && (
          <div onClick={(e) => e.stopPropagation()}>
            <PostComments
              postId={postId}
              comments={commentsList}
              isLoading={isLoadingComments}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        )}
      </div>
    </div>
  );
}