"use client";

import { useState } from "react";
import { Switch } from "../../../../../../components/ui/switch";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Page = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <Link
                                    href="/userfeed/settings/interact/messageandstories"
                                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                                  >
                                    <MdArrowBack />
                                    <span className="ml-2 text-sm font-medium">Message and Story replies </span>
                                  </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Previews
        </h1>
        <p className="text-sm text-gray-500">
          Control whether content previews appear in chats.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-3">
        <div className="bg-white border rounded-xl p-5 space-y-5 shadow-sm">

          {/* Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition duration-150">
            
            <div className="space-y-0.5">
              <label
                htmlFor="previews"
                className="cursor-pointer text-sm font-medium text-gray-900"
              >
                Show previews
              </label>
              <p className="text-xs text-gray-500">
                Display posts, stories, and reels previews in chats
              </p>
            </div>

            <Switch
              id="previews"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            When enabled, previews of content like posts, stories, and reels
            will appear in your end-to-end encrypted chats.
          </p>

          {/* Optional state feedback */}
          <p className="text-xs text-gray-400">
            {enabled ? "Previews are on" : "Previews are off"}
          </p>

        </div>
      </div>

    </div>
  );
};

export default Page;