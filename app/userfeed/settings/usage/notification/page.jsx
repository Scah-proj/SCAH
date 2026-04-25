"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Switch } from "../../../../../components/ui/switch";
import { useState } from "react";

const notificationSettings = [
  {
    key: "pauseAll",
    label: "Pause all",
    desc: "Temporarily stop all notifications.",
  },
  {
    key: "sleepMode",
    label: "Sleep Mode",
    desc: "Automatically mute notifications at night or when you need to focus.",
  },
  {
    key: "messagesOnly",
    label: "Messages only",
    desc: "Only receive notifications for messages, requests, and reminders.",
  },
];

const Page = () => {
  const [settings, setSettings] = useState({
    pauseAll: false,
    sleepMode: false,
    messagesOnly: false,
  });

  const handleToggle = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-10">

      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/userfeed/settings"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Settings</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Push notifications
        </h1>
        <p className="text-sm text-gray-500">
          Manage how and when you receive notifications.
        </p>
      </div>

      {/* Settings */}
      <div className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">

        {notificationSettings.map((setting) => (
          <div
            key={setting.key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
          >
            {/* Text */}
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-gray-900">
                {setting.label}
              </p>
              <p className="text-xs text-gray-500">
                {setting.desc}
              </p>
            </div>

            {/* Switch */}
            <Switch
              checked={settings[setting.key]}
              onCheckedChange={(value) =>
                handleToggle(setting.key, value)
              }
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Page;