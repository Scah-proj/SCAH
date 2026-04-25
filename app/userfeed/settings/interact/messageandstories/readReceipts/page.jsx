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
          Show read receipts
        </h1>
        <p className="text-sm text-gray-500">
          Control whether others can see when you've read their messages.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-3">
        <div className="bg-white border rounded-xl p-5 space-y-5 shadow-sm">

          {/* Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition duration-150">
            
            <div className="space-y-0.5">
              <label
                htmlFor="read-receipts"
                className="cursor-pointer text-sm font-medium text-gray-900"
              >
                Read receipts
              </label>
              <p className="text-xs text-gray-500">
                Let others know when you've seen their messages
              </p>
            </div>

            <Switch
              id="read-receipts"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            When this is turned on, people can see when you've read their messages.
            If turned off, you also won’t be able to see when others have read yours.
          </p>

          {/* Optional state feedback */}
          <p className="text-xs text-gray-400">
            {enabled ? "Read receipts are on" : "Read receipts are off"}
          </p>

        </div>
      </div>

    </div>
  );
};

export default Page;