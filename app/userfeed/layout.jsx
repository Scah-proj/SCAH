"use client";

import Sidenav from "./components/sidenav";
import React, { useState } from "react";
import Suggestions from "./feed/trialsAndSuggestions/page";
// import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { BellPlus, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { mobileroutes } from "./components/sidenav/navroutes";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function FeedLayout({ children }) {
  const [nav, setNav] = useState(false);
  // const handleNav = () => setNav(!nav);
  const router = useRouter();
  const pathname = usePathname();

  // Was: useUserStore((state) => state.user) — a Zustand store nothing in
  // the app writes to. Login dispatches into the Redux authSlice
  // (setCredentials), so we read from there instead, same as Sidenav.
  const user = useSelector((state) => state.auth.user);
console.log("Current user in layout:", user);
    const handleAddPost = () => {
    // Implement logic to add a new post
    router.push('/profile/createPost');
  };

  return (
<div className="min-h-screen bg-[#f8fafc]">
        {/*  MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white z-20 flex items-center justify-between px-4 border-b">
          <Link href="/profile/123">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
              <Image
                src="/wen.webp"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          </Link>

        <Link href="/feed">
          <Image
            src="/yattr.png"
            alt="Logo"
            width={70}
            height={30}
            priority
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <BellPlus size={24} className="text-gray-500" />
          <Link href="/userfeed/chats">
          <MessageCircle size={24} className="text-gray-500"/>
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* SIDEBAR */}
       <div className="hidden lg:block fixed left-0 top-0 h-full w-1/5 bg-white border-r border-gray-200 shadow-sm">

          <Sidenav/>
        </div>

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            lg:ml-[20%] lg:mr-[20%]
            pt-16 lg:pt-0
            h-screen overflow-y-auto no-scrollbar
          "
        >
          {children}
        </main>

        {/*  RIGHT SIDEBAR */}
        <aside className="hidden lg:block w-1.1/5 fixed right-0 top-0 h-screen overflow-y-auto pt-16 p-4">
          <Suggestions />
        </aside>
      </div>

      <div>
        {/* Mobile bottom nav */}
<       div className="
  lg:hidden fixed bottom-0 left-0 w-full h-18
  bg-white z-40
  flex items-center justify-around
  shadow-[0_-8px_13px_rgba(0,0,0,0.09)]
">

                                  {mobileroutes.map((route) => {
                                      const isActive = pathname === route.path;
                                      return (
                                          <div key={route.path}>
                                              <Link
                                                  href={route.path}
                                                  className="flex flex-col items-center justify-center"
                                              >
                                                  <span className={`flex-shrink-0 ${
                                                      isActive ? 'text-teal-600' : 'text-gray-400' 
                                                  }`}>
                                                      {route.icon} 
                                                  </span>
                                                  {/* <span className="text-sm mt-2">
                                                    {route.label}
                                                  </span> */}
                                              </Link>
                                          </div>
                                      );
                                  })}
                              
        </div>
      </div>
 <div className="">

     <button
  aria-label="Create post"
  className="
    fixed bottom-10 left-1/2 -translate-x-1/2 lg:right-6 lg:left-auto
    z-50
    w-16 h-16 rounded-full
    bg-teal-700 text-white
    flex items-center justify-center
    shadow-[0_12px_25px_-8px_rgba(0,0,0,0.5)]
    hover:scale-105 active:scale-95
    transition-transform cursor-pointer
  "
  onClick={handleAddPost}
>
  <AiOutlinePlus color="white" size={26}/>
</button>

      </div>
    </div>
  );
}