"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../../../../../components/ui/radio-group";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Switch } from "../../../../../components/ui/switch";

const accessibilityOptions = [
  {
    key: "disable",
    label: "Display HDR video playback",
   
  },
  {
    key: "reduce",
    label: "Reduce Motion",
    
  },
  
];


const Page = () => {

     const [settings, setSettings] = useState({
        story: false,
        live: false,
        original: false,
        cameraroll: false,
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
      <div className="space-y-2">
        <Link
          href="/userfeed/settings"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Settings</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Accessibility
        </h1>
        
      </div>

      {/* Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Captions
        </h2>

        <div className="bg-white border rounded-xl p-4 space-y-4">
          <RadioGroup defaultValue="everyone" className="space-y-2">

            <label
              htmlFor="story-everyone"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Always show closed captions</span>
              <RadioGroupItem value="always" id="caption-always" />
            </label>

            <label
              htmlFor="story-following"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Only show translated closed captions</span>
              <RadioGroupItem value="only" id="caption-only" />
            </label>

            <label
              htmlFor="story-none"
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span>Never show closed captions</span>
              <RadioGroupItem value="none" id="caption-never" />
            </label>

          </RadioGroup>
        </div>
      </div>
      {/* Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        HDR
        </h2>

        <div className="bg-white border rounded-xl p-4 space-y-4">
          {accessibilityOptions.map((setting) => (
          <div
            key={setting.key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
          >
            {/* Text */}
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-gray-900">
                {setting.label}
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

    </div>
  );
};

export default Page;