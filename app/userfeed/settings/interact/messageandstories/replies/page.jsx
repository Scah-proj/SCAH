"use client";

import { RadioGroup, RadioGroupItem } from "../../../../../../components/ui/radio-group";
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
          Story replies
        </h1>
        <p className="text-sm text-gray-500">
          Control who can reply to your stories.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Who can reply to your stories
        </h2>

        <div className="bg-white border rounded-xl p-4 space-y-4">
          <RadioGroup defaultValue="everyone" className="space-y-2">

            <label
              htmlFor="story-everyone"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Allow story replies from everyone</span>
              <RadioGroupItem value="everyone" id="story-everyone" />
            </label>

            <label
              htmlFor="story-following"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Only allow replies from people you follow</span>
              <RadioGroupItem value="following" id="story-following" />
            </label>

            <label
              htmlFor="story-none"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Don’t allow story replies</span>
              <RadioGroupItem value="none" id="story-none" />
            </label>

          </RadioGroup>
        </div>
      </div>

    </div>
  );
};

export default Page;