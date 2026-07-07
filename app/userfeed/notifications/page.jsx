"use client";

import { useState, useMemo } from "react";

import Categories from "./Categories";
import NotificationByGroup from "./NotificationByGroup";
import { groupNotifications } from "../../../lib/groupedNotification";

import { useGetNotificationsQuery } from "../../redux/api/connectionApi";

const Page = () => {
  const [active, setActive] = useState("all");

  const { data, isLoading, error } = useGetNotificationsQuery();

  const notifications = data?.data?.notifications || [];

  const filtered = useMemo(() => {
    if (active === "all") return notifications;

    return notifications.filter(
      (notification) => notification.type === active
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

        <Categories active={active} setActive={setActive} />

        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-teal-600 animate-spin"></div>

            <p className="text-sm text-gray-500">
              Loading notifications...
            </p>
          </div>
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

      <Categories active={active} setActive={setActive} />

      {notifications.length === 0 ? (
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