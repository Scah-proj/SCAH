"use client";
import { RadioGroup, RadioGroupItem } from "../../../../../components/ui/radio-group";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
          <Link
                                    href="/userfeed/settings"
                                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                                  >
                                    <MdArrowBack />
                                    <span className="ml-2 text-sm font-medium">Back to Settings </span>
                                  </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Tags and mentions
        </h1>
        <p className="text-gray-500 text-sm">
          Control who can tag and mention you across the platform.
        </p>
      </div>

      {/* Section */}
      <div className="space-y-8">

        {/* TAGS */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Who can tag you
          </h2>

          <div className="bg-white border rounded-xl p-4 space-y-4">
            <RadioGroup defaultValue="everyone" className="space-y-2">

              <label
                htmlFor="tag-everyone"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span>Allow tags from everyone</span>
                <RadioGroupItem value="everyone" id="tag-everyone" />
              </label>

              <label
                htmlFor="tag-following"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span>Allow tags from people you follow</span>
                <RadioGroupItem value="following" id="tag-following" />
              </label>

              <label
                htmlFor="tag-none"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span>Don't allow tags</span>
                <RadioGroupItem value="none" id="tag-none" />
              </label>

            </RadioGroup>

            <p className="text-sm text-gray-500">
              Choose who can tag you in their posts. If you restrict tags, others will be notified.
              Potential spam will always be filtered.
            </p>
          </div>
        </div>

        {/* MENTIONS */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Who can @mention you
          </h2>

          <div className="bg-white border rounded-xl p-4 space-y-4">
            <RadioGroup defaultValue="everyone" className="space-y-2">

              <label
                htmlFor="mention-everyone"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span>Allow @mentions from everyone</span>
                <RadioGroupItem value="everyone" id="mention-everyone" />
              </label>

              <label
                htmlFor="mention-following"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span>Allow @mentions from people you follow</span>
                <RadioGroupItem value="following" id="mention-following" />
              </label>

            </RadioGroup>

            <p className="text-sm text-gray-500">
              Control who can mention you in stories, comments, captions, and more.
              If restricted, people will be notified.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;