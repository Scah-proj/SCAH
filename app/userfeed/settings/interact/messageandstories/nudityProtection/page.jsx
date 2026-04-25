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
          Nudity protection
        </h1>
        <p className="text-sm text-gray-500">
          Automatically blur sensitive content in your chats.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-3">
        <div className="bg-white border rounded-xl p-4 space-y-4">

          {/* Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
            <label htmlFor="nudity-protection" className="cursor-pointer">
              Nudity protection
            </label>

            <Switch
              id="nudity-protection"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            Photos detected as containing nudity will be blurred automatically in chats.
            You can choose to view them if you want.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Page;