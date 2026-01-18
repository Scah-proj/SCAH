"use client";

import Sidenav from "./components/sidenav";
import React, { useState } from "react";
import Suggestions from "./feed/trialsAndSuggestions/page";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { BellPlus } from "lucide-react";

export default function FeedLayout({ children }) {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  return (
    <div className="min-h-screen">
      {/*  MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-gray-50 z-20 flex items-center justify-between px-4 shadow-sm">
        <AiOutlineMenu size={28} onClick={handleNav} />

        <Link href="/feed">
          <Image
            src="/yattr.png"
            alt="Logo"
            width={80}
            height={30}
            priority
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <BellPlus size={24} className="text-gray-500" />
          <Link href="/profile/123">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <Image
                src="/wen.webp"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* SIDEBAR */}
        <div
          className={`
            fixed left-0 top-0 h-full w-80 lg:w-1/5
            bg-white shadow-lg z-30
            transform transition-transform duration-300
            ${nav ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <Sidenav onClose={handleNav} />
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
        <aside className="hidden lg:block w-1/5 fixed right-0 top-0 h-screen overflow-y-auto pt-16 p-4">
          <Suggestions />
        </aside>
      </div>
    </div>
  );
}
