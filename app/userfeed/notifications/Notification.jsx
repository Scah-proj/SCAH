"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { feedApi } from "../../redux/api/feedApi";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";

function isValidPhotoUrl(url) {
  return typeof url === "string" && url.length > 0 && !url.toLowerCase().includes("fakepath");
}

const Notification = ({ notification }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const senderId =
    notification.sender?._id ||
    notification.sender?.id ||
    notification.relatedUser ||
    notification.sender;

  const { data: publicProfile } = useGetPublicProfileQuery(senderId, {
    skip: !senderId,
  });

  const profile = publicProfile?.profile;
  const user = publicProfile?.user;

  const profilePicture =
    (isValidPhotoUrl(profile?.profilePicture) && profile.profilePicture) ||
    (isValidPhotoUrl(profile?.media?.profilePicture) && profile.media.profilePicture) ||
    (isValidPhotoUrl(notification.sender?.profilePicture) && notification.sender.profilePicture) ||
    (isValidPhotoUrl(notification.sender?.profilePic) && notification.sender.profilePic) ||
    "/default-avatar.png";

  const senderName =
    user?.name ||
    notification.sender?.name ||
    "User";

  // Avatar click always goes to the sender's profile, regardless of what
  // kind of notification this is — separate from handleClick below, which
  // routes based on notification.type (post, tryout, etc). Previously the
  // whole row shared one handler, so clicking the avatar on e.g. a
  // "post_like" notification took you to the post, not the person who
  // liked it.
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (senderId) {
      router.push(`/profile/${senderId}`);
    }
  };

  const handleClick = () => {
    // Post notifications
    if (
      ["post_like", "post_comment", "comment_reply"].includes(
        notification.type
      ) &&
      notification.relatedPost
    ) {
      const postId = notification.relatedPost;

      if (notification.post) {
        dispatch(
          feedApi.util.upsertQueryData(
            "getPostById",
            postId,
            notification.post
          )
        );
      }

      router.push(`/profile/Posts/${postId}`);
      return;
    }

    // Follow notifications
    if (
      ["follow", "connection_request", "connection_accepted"].includes(
        notification.type
      ) &&
      notification.relatedUser
    ) {
      router.push(`/profile/${notification.relatedUser}`);
      return;
    }

    // Scout
    if (
      notification.type === "tryout_application" &&
      notification.relatedTryout
    ) {
      router.push(
        `/userfeed/tryout/application/${notification.relatedTryout}`
      );
      return;
    }

    // Athlete
    if (
      notification.type === "tryout_application_status" &&
      notification.relatedTryout
    ) {
      router.push(`/userfeed/tryout/${notification.relatedTryout}`);
      return;
    }

    // Fallback: unrecognized notification types still go somewhere
    // useful instead of doing nothing on click.
    if (senderId) {
      router.push(`/profile/${senderId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex gap-4 p-4 mb-4 bg-white hover:bg-gray-50 shadow-xl transition hover:shadow-2xl cursor-pointer rounded-xl"
    >
      {/* Avatar — always routes to the sender's profile */}
      <div
        onClick={handleAvatarClick}
        className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border flex-shrink-0 cursor-pointer"
      >
        <Image
          src={profilePicture}
          alt={senderName}
          width={34}
          height={34}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          
          {notification.message}
        </p>

        {notification.secondary && (
          <p className="text-xs text-gray-500 mt-1">
            {notification.secondary}
          </p>
        )}
      </div>

      
      {!notification.read && (
        <span className="absolute right-3 top-4 w-2.5 h-2.5 bg-teal-500 rounded-full" />
      )}
    </div>
  );
};

export default Notification;