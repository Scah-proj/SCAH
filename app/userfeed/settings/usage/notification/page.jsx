"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { Switch } from "../../../../../components/ui/switch";
import { useEffect, useState } from "react";
import {
  useGetNotificationSettingsQuery,
  useTogglePauseAllNotificationsMutation,
  useToggleSleepModeNotificationsMutation,
} from "../../../../redux/api/connectionApi"; 

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
];

const Page = () => {
  const { data, isLoading, isError } = useGetNotificationSettingsQuery();

  const [togglePauseAll] = useTogglePauseAllNotificationsMutation();
  const [toggleSleepMode] = useToggleSleepModeNotificationsMutation();

  const [settings, setSettings] = useState({
    pauseAll: false,
    sleepMode: false,
  });

  // Sync local state once server settings arrive
  useEffect(() => {
    const fetchedSettings = data?.data?.settings;
    if (fetchedSettings) {
      setSettings({
        pauseAll: !!fetchedSettings.pauseAll,
        sleepMode: !!fetchedSettings.sleepMode,
      });
    }
  }, [data]);

  const handleToggle = async (key, value) => {
    const previousValue = settings[key];

    // Optimistic update
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    try {
      if (key === "pauseAll") {
        await togglePauseAll(value).unwrap();
      } else if (key === "sleepMode") {
        await toggleSleepMode(value).unwrap();
      }
    } catch (err) {
      // Roll back on failure
      setSettings((prev) => ({
        ...prev,
        [key]: previousValue,
      }));
      console.error(`Failed to update ${key}:`, err);
    }
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin mb-2 text-gray-600" />
          <p className="text-sm font-medium">Loading your settings...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-8 text-red-500">
          <p className="text-sm font-medium">
            Failed to load notification settings. Please try refreshing.
          </p>
        </div>
      )}

      {/* Settings */}
      {!isLoading && !isError && (
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
      )}
    </div>
  );
};

export default Page;