"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Notification = ({ notification }) => {
  const router = useRouter();

  const handleClick = () => {
    // Post notifications
    if (
      ["post_like", "post_comment", "comment_reply"].includes(
        notification.type
      ) &&
      notification.relatedPost
    ) {
      router.push(`/userfeed/feed/feedComponent/${notification.relatedPost}`);
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

    // Tryout: someone applied (scout-facing) -> take them to the applicant list
    if (
      notification.type === "tryout_application" &&
      notification.relatedTryout
    ) {
      router.push(
        `/userfeed/tryout/application/${notification.relatedTryout}`
      );
      return;
    }

    // Tryout: application accepted/rejected (athlete-facing) -> take them to the tryout listing
    if (
      notification.type === "tryout_application_status" &&
      notification.relatedTryout
    ) {
      router.push(`/userfeed/tryout/${notification.relatedTryout}`);
      return;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex gap-4 p-4 mb-4 bg-white hover:bg-gray-50 shadow-xl transition hover:shadow-2xl cursor-pointer rounded-xl"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
        <Image
          src={notification.sender?.profilePic || "/default-avatar.png"}
          alt={notification.sender?.name || "User"}
          width={34}
          height={34}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{notification.sender?.name}</span>{" "}
          {notification.message}
        </p>

        {notification.secondary && (
          <p className="text-xs text-gray-500 mt-1">
            {notification.secondary}
          </p>
        )}
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <span className="absolute right-3 top-4 w-2.5 h-2.5 bg-teal-500 rounded-full" />
      )}
    </div>
  );
};

export default Notification;