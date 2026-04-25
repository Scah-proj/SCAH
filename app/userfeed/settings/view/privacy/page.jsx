"use client"
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MdArrowBack } from "react-icons/md";

const privacySettings = [
    {
        label: "Private account",
        desc: "When you account is public, your profile and posts can be seen by anyone, on or off Scah, even if they don’t have a Scah account. When your account is private, only the followers that you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Certain info on your profile picture and username, is visible to everyone on and off Scah. Learn more",
    },
    {
        label: "Allow public photos and videos to appear in search engine results",
        desc: "When this is on, search engines such as Google can show your public phots and videos in search results outside of Scah. when this is off, links to your publicly shared content can still appear in search result. Learn more"
    },
];
const Page = () => {
    return(
        <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
                <div className="space-y-3">
                    <Link
                            href="/userfeed/settings"
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                          >
                            <MdArrowBack />
                            <span className="ml-2 text-sm font-medium">Back to Settings </span>
                          </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Account privacy
            </h1>  
            </div>
            <div className="px-4 space-y-6">
                {privacySettings.map((setting) => (
                     <div key={setting.label} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md">
                            <div>
                            <span className="font-semibold">{setting.label}</span>
                            <p className="text-sm text-gray-500">{setting.desc}</p>
                            </div>
                       
                          <span className="text-gray-400"><ChevronRight size={18} /></span>
                 </div>
                ))}
            </div>
        </div>
    )
}
export default Page;