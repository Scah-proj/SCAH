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
          Message requests
        </h1>
        <p className="text-sm text-gray-500">
          Control who can send you message requests and how they appear.
        </p>
      </div>

      <div className="space-y-8">

        {/* WHO CAN MESSAGE */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Who can send you message requests
          </h2>

          <div className="bg-white border rounded-xl p-4 space-y-4">
            <RadioGroup defaultValue="everyone" className="space-y-2">

              <label
                htmlFor="msg-everyone"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Everyone</span>
                <RadioGroupItem value="everyone" id="msg-everyone" />
              </label>

              <label
                htmlFor="msg-followers"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Your followers</span>
                <RadioGroupItem value="followers" id="msg-followers" />
              </label>

              <label
                htmlFor="msg-none"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>No one</span>
                <RadioGroupItem value="none" id="msg-none" />
              </label>

            </RadioGroup>

            <p className="text-sm text-gray-500">
              People you follow or have chatted with can always message you unless blocked.
            </p>
          </div>
        </div>

        {/* TYPE OF REQUESTS (GROUPS / GENERAL) */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Type of message requests
          </h2>

          <div className="bg-white border rounded-xl p-4 space-y-4">
            <RadioGroup defaultValue="everyone" className="space-y-2">

              <label
                htmlFor="type-everyone"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Everyone</span>
                <RadioGroupItem value="everyone" id="type-everyone" />
              </label>

              <label
                htmlFor="type-followers"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Your followers</span>
                <RadioGroupItem value="followers" id="type-followers" />
              </label>

            </RadioGroup>

            <p className="text-sm text-gray-500">
              People you’ve blocked cannot add you to group chats.
            </p>
          </div>
        </div>

        {/* HIDDEN REQUESTS / FILTERING */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Hidden requests
          </h2>

          <div className="bg-white border rounded-xl p-4 space-y-4">
            <RadioGroup defaultValue="everyone" className="space-y-2">

              <label
                htmlFor="hidden-everyone"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Everyone</span>
                <RadioGroupItem value="everyone" id="hidden-everyone" />
              </label>

              <label
                htmlFor="hidden-followers"
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <span>Your followers</span>
                <RadioGroupItem value="followers" id="hidden-followers" />
              </label>

            </RadioGroup>

            <p className="text-sm text-gray-500">
              Offensive, spam, or scam requests will be filtered into Hidden Requests and notifications may be limited.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;