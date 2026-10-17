"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useGetUnreadNotificationCountQuery } from "../redux/api/connectionApi";
import { setUnreadNotificationCount } from "../redux/features/connection/connectionSlice";

const getUnreadCount = (response) => {
  const count =
    typeof response === "number"
      ? response
      : response?.data?.unreadCount ??
        response?.unreadCount ??
        response?.data?.count ??
        response?.count;

  if (!Number.isSafeInteger(count) || count < 0) {
    console.error("The unread notification count response is invalid.", response);
    return null;
  }

  return count;
};

const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("The API URL is not configured.");
  return baseUrl.replace(/\/+$/, "");
};

export default function NotificationRealtime() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data, refetch } = useGetUnreadNotificationCountQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data === undefined) return;
    const count = getUnreadCount(data);
    if (count !== null) dispatch(setUnreadNotificationCount(count));
  }, [data, dispatch]);

  useEffect(() => {
    if (!token) {
      dispatch(setUnreadNotificationCount(0));
      return undefined;
    }

    let socket;
    try {
      socket = io(getApiBaseUrl(), {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
      });
    } catch (error) {
      console.error("Unable to connect to notification updates.", error);
      return undefined;
    }

    const onConnect = () => {
      refetch()
        .unwrap()
        .then((response) => {
          const count = getUnreadCount(response);
          if (count !== null) dispatch(setUnreadNotificationCount(count));
        })
        .catch((error) => {
          console.error("Unable to refresh the unread notification count.", error);
        });
    };

    const onCountUpdated = (payload) => {
      const count = getUnreadCount(payload);
      if (count !== null) dispatch(setUnreadNotificationCount(count));
    };

    const onNewNotification = (payload) => {
      const notification = payload?.notification;
      if (!notification || typeof notification !== "object") {
        console.error("Received an invalid new notification event.", payload);
        return;
      }

      const message =
        notification.message ||
        notification.title ||
        "You have a new notification.";

      toast.info(message, {
        description: notification.sender?.name || undefined,
        action: {
          label: "View",
          onClick: () => window.location.assign("/userfeed/notifications"),
        },
      });
    };

    const onConnectError = (error) => {
      console.error("Notification socket connection failed.", error);
    };

    socket.on("connect", onConnect);
    socket.on("notification_count_updated", onCountUpdated);
    socket.on("new_notification", onNewNotification);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("notification_count_updated", onCountUpdated);
      socket.off("new_notification", onNewNotification);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, [dispatch, refetch, token]);

  return null;
}
