"use client";

import { useState, useMemo } from "react";
import { mockNotifications } from "./mockdata";
import Categories from "./Categories";
import NotificationByGroup from "./NotificationByGroup";
import { groupNotifications } from "../../../lib/groupedNotification";

const Page = () => {
     const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return mockNotifications;
    return mockNotifications.filter((n) => n.category === active);
  }, [active]);

  const grouped = groupNotifications(filtered);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24 space-y-8">

      <h1 className="text-2xl font-bold">Notifications</h1>

      <Categories active={active} setActive={setActive} />

      <div className="space-y-8">
        <NotificationByGroup title="Recent" notifications={grouped.recent} />
        <NotificationByGroup
          title="Earlier This Week"
          notifications={grouped.week}
        />
        <NotificationByGroup
          title="This Month"
          notifications={grouped.month}
        />
      </div>

    </div>

    )
}
    export default Page;