"use client";

import { useState, useMemo } from "react";
import { Loader } from "lucide-react";

import NotificationPills from "./Categories";
import NotificationByGroup from "./NotificationByGroup";
import { groupNotifications } from "../../../lib/groupedNotification";
import { getNotificationCategory } from "./notificationCategories";

import { useGetNotificationsQuery } from "../../redux/api/connectionApi";

const Page = () => {
  const [active, setActive] = useState("all");

  const { data, isLoading, error } = useGetNotificationsQuery();

  const notifications = data?.data?.notifications || [];

  const filtered = useMemo(() => {
    if (active === "all") return notifications;

    return notifications.filter(
      (notification) => getNotificationCategory(notification.type) === active
    );
  }, [active, notifications]);

  const grouped = useMemo(
    () => groupNotifications(filtered),
    [filtered]
  );

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24 space-y-8">
        <h1 className="text-2xl font-bold">Notifications</h1>

        <NotificationPills active={active} setActive={setActive} />

        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-sm text-gray-500">
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24 space-y-8">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <NotificationPills active={active} setActive={setActive} />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-8">
          <NotificationByGroup
            title="Recent"
            notifications={grouped.recent}
          />

          <NotificationByGroup
            title="Earlier This Week"
            notifications={grouped.week}
          />

          <NotificationByGroup
            title="This Month"
            notifications={grouped.month}
          />
        </div>
      )}
    </div>
  );
};

export default Page;