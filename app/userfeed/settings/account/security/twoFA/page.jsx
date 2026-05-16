"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "../../../../../../components/ui/radio-group";
import { useState } from "react";



const Page = () => {
  const [settings, setSettings] = useState({
    pauseAll: false,
    sleepMode: false,
    messagesOnly: false,
  });

  

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
          Two-factor authentication
        </h1>
        <p className="text-sm text-gray-500">
          Add an extra layer of security to your account.
        </p>
      </div>

      {/* Settings */}
      <div className="">
    <div>
        <h3 className="text-xl md:text-lg font-bold text-gray-900 my-2">
          Choose your preferred method
        </h3>
    </div>
    <RadioGroup defaultValue="everyone" className="space-y-2">

            <label
              htmlFor="story-everyone"
              className="flex items-center justify-between p-3 border rounded-xl p-5 space-y-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
                <div>
              <span>SMS Code</span>
                <p className="text-sm text-gray-500">Receive a code via SMS to your registered phone number.</p>
                </div>
              <RadioGroupItem value="sms" id="sms" />
            </label>

            <label
              htmlFor="story-following"
              className="flex items-center justify-between p-3 border rounded-xl p-5 space-y-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
                <div>
              <span>Email Code</span>
              <p className="text-sm text-gray-500">Receive a code via email to your registered email address.</p>
                </div>
              <RadioGroupItem value="email" id="email" />
            </label>

            <label
              htmlFor="story-none"
              className="flex items-center justify-between p-3 border rounded-xl p-5 space-y-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
                <div>
              <span>Security Key</span>
              <p className="text-sm text-gray-500">Use a security key for authentication.</p>
                </div>  
              <RadioGroupItem value="securityKey" id="securityKey" />
            </label>

          </RadioGroup>

      </div>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <div className="bg-teal-700 hover:bg-teal-800 text-white py-3 px-5 rounded-md  cursor-pointer w-2/3 text-center">
            <p className="text-white font-medium">Continue</p>
        </div>
        <div className="text-gray-600 hover:text-gray-900 cursor-pointer w-full text-center">
            <p>I'll do this later</p>
        </div>
      </div>
    </div>
  );
};

export default Page;