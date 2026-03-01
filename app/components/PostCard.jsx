"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Send,
  Star,
  UserX2,
  Copy,
  CircleSlash,
  MessageSquareWarning
} from "lucide-react";
import PostComments from "./comment/CommentSection";
import SharePost from "./SharePost";
import { useCommentStore } from "../../lib/commentStore";
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../../components/ui/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { timeAgo } from "../../components/timeAgo"


export default function PostCard({ post }) {
  if (!post) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  const [likes, setLikes] = useState(post.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [reposts, setReposts] = useState(post.reposts ?? 0);
  const [reposted, setReposted] = useState(false);
  const [shares, setShares] = useState(post.shares ?? 0);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const commentsByPost = useCommentStore(state => state.commentsByPost);
  const commentCount = (commentsByPost[post.id] || []).length;
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)



  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl mb-2 transition hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border">
              <Image
                src={post.authorAvatar || "/default-avatar.png"}
                alt={post.author || "Author"}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author || "Unknown"} •  
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
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Bookmark/>
              Save
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star/>
            Add to Favourites
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX2/>
            Unfollow
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy/>
            Copy link to post
            </DropdownMenuItem>
            <DropdownMenuItem >
              < CircleSlash/>
              Not Interested
              </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowReportDialog(true)} className="text-red">
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
              Your report is anonymous. If someone is in immediate danger , call the local emergency service
              , don't wait.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                I just don't like it
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Bullying or unwanted contact
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Suicide, self-injury or eating disorders
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Violence, hate or exploitation
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Selling or promoting restricted items
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Nudity or sexual activity
              </FieldLabel>
            </Field>
          <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
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

        {/* Title */}
        {post.title && (
          <div className="px-4 pb-2">
            <h2 className="text-base text-gray-900">
              {post.title}
            </h2>
          </div>
        )}

        {/* Hashtags */}
        {post.hashtags?.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {post.hashtags.map((tag, i) => (
              <span
                key={i}
                className="text-sm text-teal-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={post.image}
              alt="Post"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-5">
            {/* Like */}
            <div className="flex items-center">       
            <button className="flex space-y-1 mr-1 cursor-pointer" onClick={() => setLikes(liked ? likes - 1 : likes + 1) || setLiked(!liked)}>
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
             <button onClick={() => setShowComments(prev => !prev)}  className="flex space-y-1 mr-1 cursor-pointer">
              <MessageCircle
                size={22}
                className="text-gray-600 hover:text-teal-600"
                
              />
            </button>
                <span>{commentCount > 0 && <span>{commentCount}</span>}</span>
            </div>

            {/* Repost */}
            <div className="flex items-center">
            <button className="flex space-y-1 mr-1 cursor-pointer" onClick={() => setReposts(reposted ? reposts - 1 : reposts + 1) || setReposted(!reposted)}>
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
            <button className="flex space-y-1 mr-1 cursor-pointer" onClick={() => setIsShareOpen(true)}>
              <Send
                size={22}
                className="text-gray-600 hover:text-teal-600"
              />
             
            </button>
            <span>{shares > 0 && <span>{shares}</span>}</span>
            </div>
          </div>

          {/* Save */}
          <button onClick={() => setSaved(!saved)}>
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
        <div className="text-xs text-gray-500 px-4 mb-2">{timeAgo(post.createdAt)}

        </div>
         
                {showComments && (
          <PostComments
            postId={post.id}
          />
        )}
      </div>
     
        {isShareOpen && (
        <SharePost postId={post.id} onClose={() => setIsShareOpen(false)} />
      )
        }
    </div>
  );
}
