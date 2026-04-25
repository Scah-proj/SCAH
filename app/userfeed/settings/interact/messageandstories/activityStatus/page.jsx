"use client";

import { Switch } from "../../../../../../components/ui/switch";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Page = () => {
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
          Show activity status
        </h1>
        <p className="text-sm text-gray-500">
          Control who can see when you're active.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-3">
        <div className="bg-white border rounded-xl p-4 space-y-4">

          {/* Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
            <label htmlFor="activity-status" className="cursor-pointer">
              Show activity status
            </label>
            <Switch id="activity-status" />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            Allow accounts you follow and anyone you message to see when you were last active or currently online.  
            If this is turned off, you won’t be able to see the activity status of others.
          </p>

          <p className="text-sm text-gray-500">
            You can continue to use the app even if activity status is turned off.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Page;