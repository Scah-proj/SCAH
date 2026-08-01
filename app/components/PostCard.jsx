"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Send,
  Star,
  Copy,
  CircleSlash,
  MessageSquareWarning,
  User,
  MoreHorizontalIcon,
  Check // Optional: to show a success icon briefly
} from "lucide-react";
import PostComments from "./comment/CommentSection";
import SharePost from "./SharePost";
import { useCommentStore } from "../../lib/commentStore";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { timeAgo } from "../../components/timeAgo";
import { 
  useToggleLikePostMutation, 
  useToggleSavePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery
} from "../redux/api/feedApi";
import { useGetPublicProfileQuery } from "../redux/api/profileApi";

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
  if (!post) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  // API Hooks
  const [toggleLikePost] = useToggleLikePostMutation();
  const [toggleSavePost] = useToggleSavePostMutation();
  const [addComment] = useAddCommentMutation();
  
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = getUserId(currentUser);

  const authorId =
    post.author?._id ||
    post.author?.id ||
    post.user_id;

  const { data: authorProfileData } = useGetPublicProfileQuery(authorId, {
    skip: !authorId,
  });

  const handleAvatarClick = (e) => {
    e.stopPropagation();

    if (authorId) {
      router.push(`/profile/${authorId}`);
    }
  };

  const handleOpenPost = () => {
    router.push(`/profile/Posts/${post.id}`);
  };

  const [showComments, setShowComments] = useState(false);
  const { data: commentsData, isLoading: isLoadingComments } = useGetCommentsQuery(post.id, {
    skip: !showComments,
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

  const [likes, setLikes] = useState(initialLikesCount);
  const [liked, setLiked] = useState(initialLiked);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [reposts, setReposts] = useState(post.reposts ?? 0);
  const [reposted, setReposted] = useState(!!(post.reposted || post.isReposted));
  const [shares, setShares] = useState(post.shares ?? 0);
  const [saved, setSaved] = useState(!!(post.hasSaved || post.saved || post.isSaved));
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  // Track copy feedback state
  const [isCopied, setIsCopied] = useState(false);

  // Track avatar error state for fallback icon
  const [hasAvatarError, setHasAvatarError] = useState(false);

  // Keep the card aligned with refreshed RTK Query feed data. This makes
  // persisted likes and comment totals visible after a reload or cache refresh.
  useEffect(() => {
    setLikes(initialLikesCount);
    setLiked(initialLiked);
    setCommentCount(initialCommentCount);
  }, [initialCommentCount, initialLiked, initialLikesCount, post.id]);

  const authorName = (() => {
    if (typeof post.author === "string" && post.author.trim()) {
      return post.author;
    }
    if (post.author && typeof post.author === "object") {
      const fullName = `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim();
      return fullName || "Unknown";
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

  const rawComments = commentsData?.data?.comments || [];
  
  const commentsList = rawComments.map(comment => {
    const fullName = comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : "Unknown User";
    return {
      id: comment.id,
      postId: comment.post_id,
      userId: comment.user_id,
      content: comment.content,
      text: comment.content, 
      author: fullName,      
      isActive: comment.is_active,
      createdAt: comment.created_at,
      user: comment.user ? {
        id: comment.user._id, 
        firstName: comment.user.firstName,
        lastName: comment.user.lastName,
        avatar: comment.user.avatar || "/default-avatar.png"
      } : null
    };
  });

  const commentsByPost = useCommentStore(state => state.commentsByPost);
  
  const loadedCommentCount = commentsList.length;
  const localCommentCount = (commentsByPost[post.id] || []).length;
  const displayedCommentCount = Math.max(
    commentCount,
    loadedCommentCount,
    localCommentCount
  );

  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Copy Link Handler
  const handleCopyLink = async (e) => {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();

  // The direct URL to the post
  const postUrl = `${window.location.origin}/profile/Posts/${post.id}`;

  try {
    await navigator.clipboard.writeText(postUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy post link:", err);
  }
};

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    const previousLiked = liked;
    const previousLikesCount = likes;
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);

    try {
      const res = await toggleLikePost(post.id).unwrap();
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
    } catch (err) {
      setLiked(previousLiked);
      setLikes(previousLikesCount);
    }
  };

  const handleSaveClick = async (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    const previousSaved = saved;
    setSaved(!saved);

    try {
      const res = await toggleSavePost(post.id).unwrap();
      if (res?.success && res?.data) {
        setSaved(res.data.saved);
      }
    } catch (err) {
      setSaved(previousSaved);
    }
  };

  const handleCommentAdded = async (content) => {
    try {
      const res = await addComment({ postId: post.id, content }).unwrap();
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
              <p className="text-sm font-semibold text-gray-900">
                {authorName}{authorIsVerified ? " ✓" : ""} •  
                <span className="text-xs mx-2 font-semibold text-teal-600">
                  {post.status || "Active"}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                {post.sport} • {post.position}
              </p>
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" aria-label="Open menu" size="icon-sm">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={handleSaveClick}>
                  <Bookmark/>
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star/>
                  Add to Favourites
                </DropdownMenuItem>
                
                {/* Updated Copy Link Item */}
                <DropdownMenuItem onSelect={handleCopyLink}>
                  {isCopied ? <Check className="text-teal-600" /> : <Copy />}
                  {isCopied ? "Copied!" : "Copy link to post"}
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <CircleSlash/>
                  Not Interested
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowReportDialog(true)} className="text-red-600">
                  <MessageSquareWarning color="red"/>
                  Report post
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Why are you reporting this post?</DialogTitle>
                <DialogDescription>
                  Your report is anonymous. If someone is in immediate danger, call the local emergency service, don't wait.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox id="report-1" />
                  <FieldLabel htmlFor="report-1" className="font-normal">
                    I just don't like it
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-2" />
                  <FieldLabel htmlFor="report-2" className="font-normal">
                    Bullying or unwanted contact
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-3" />
                  <FieldLabel htmlFor="report-3" className="font-normal">
                    Suicide, self-injury or eating disorders
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-4" />
                  <FieldLabel htmlFor="report-4" className="font-normal">
                    Violence, hate or exploitation
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-5" />
                  <FieldLabel htmlFor="report-5" className="font-normal">
                    Selling or promoting restricted items
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-6" />
                  <FieldLabel htmlFor="report-6" className="font-normal">
                    Nudity or sexual activity
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="report-7" />
                  <FieldLabel htmlFor="report-7" className="font-normal">
                    Scam, fraud or spam
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button onClick={() => setShowFeedback(true)} type="submit">
                  <DialogClose>Submit</DialogClose>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thanks for your feedback</DialogTitle>
                <DialogDescription>
                  We use these reports to show you less of this kind of content in the future.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Done</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="px-4 pb-2">
            <h2 className="text-base text-gray-900">
              {renderCaption(post.caption)}
            </h2>
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
        {post.media?.length > 0 && (() => {
          const primaryMedia = post.media[0];
          const isImage = primaryMedia.mimetype?.startsWith("image/");
          const isVideo = primaryMedia.mimetype?.startsWith("video/");

          if (isImage) {
            return (
              <div className="relative w-full aspect-square bg-gray-100">
                <Image
                  src={primaryMedia.url}
                  alt="Post"
                  fill
                  className="object-cover"
                />
              </div>
            );
          }

          if (isVideo) {
            return (
              <div className="relative w-full aspect-square bg-black">
                <video
                  src={primaryMedia.url}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            );
          }

          return (
            <a
              href={primaryMedia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 mb-3 flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                {primaryMedia.mimetype?.split("/")[1]?.slice(0, 3) || "file"}
              </div>
              <span className="text-sm text-gray-700 truncate">
                {primaryMedia.path?.split("/").pop() || "Attachment"}
              </span>
            </a>
          );
        })()}

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-3">
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
              onClick={(e) => {
                e.stopPropagation();
                setShowComments((prev) => !prev);
              }}
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
              <button className="flex space-y-1 mr-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setReposts(reposted ? reposts - 1 : reposts + 1); setReposted(!reposted); }}>
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

            {/* Share */}
            <div className="flex items-center">
              <button className="flex space-y-1 mr-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsShareOpen(true); }}>
                <Send
                  size={22}
                  className="text-gray-600 hover:text-teal-600"
                />
              </button>
              <span>{shares > 0 && <span>{shares}</span>}</span>
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

        <div className="text-xs text-gray-500 px-4 mb-2">
          {timeAgo(post.created_at || post.createdAt)}
        </div>
            
        {showComments && (
          <PostComments
            postId={post.id}
            comments={commentsList}
            isLoading={isLoadingComments}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
        
      {isShareOpen && (
        <SharePost postId={post.id} onClose={() => setIsShareOpen(false)} />
      )}
    </div>
  );
}
