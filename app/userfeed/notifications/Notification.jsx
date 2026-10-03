"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "lucide-react"
import { feedApi } from "../../redux/api/feedApi";
import { useGetPublicProfileQuery } from "../../redux/api/profileApi";
import { normalizeNotificationType } from "./notificationCategories";

function isValidPhotoUrl(url) {
  return (
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.toLowerCase().includes("fakepath")
  );
}

const Notification = ({ notification }) => {
  const [hasImageError, setHasImageError] = useState(false);
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
    [
      profile?.profilePicture,
      profile?.media?.profilePicture,
      user?.profilePicture,
      user?.picture,
      notification.sender?.profilePicture,
      notification.sender?.profilePic,
      notification.sender?.picture,
    ].find(isValidPhotoUrl)?.trim() || null;

  const senderName =
    user?.name ||
    notification.sender?.name ||
    "User";

  
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (senderId) {
      router.push(`/profile/${senderId}`);
    }
  };

  const handleClick = () => {
    const normalizedType = normalizeNotificationType(notification.type);

    // Post notifications
    if (
      ["post_like", "post_comment", "comment_reply", "post_tag"].includes(
        normalizedType
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
        normalizedType
      ) &&
      notification.relatedUser
    ) {
      router.push(`/profile/${notification.relatedUser}`);
      return;
    }

    // Scout
    if (
      normalizedType === "tryout_application" &&
      notification.relatedTryout
    ) {
      router.push(
        `/userfeed/tryout/application/${notification.relatedTryout}`
      );
      return;
    }

    // Athlete
    if (
      normalizedType === "tryout_application_status" &&
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
        {profilePicture && !hasImageError ? (
          <Image
            src={profilePicture}
            alt={senderName}
            width={34}
            height={34}
            className="object-cover w-full h-full"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </div>
        )}
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
