"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { navroutes } from "./navroutes";
import { AiOutlineClose } from 'react-icons/ai';
import { useUserStore } from "../../../../lib/userStore";


const Sidenav = ({ onClose }) => {
    const pathname = usePathname();
const user = useUserStore((state) => state.user);
console.log("Current user in Sidenav:", user);

    return (
        <div className="relative w-full h-screen flex flex-col">
            <div className="flex-shrink-0 px-4 pt-4">
                {/* Mobile header - close button on the right */}
                {/* <div className="lg:hidden flex justify-end items-center mb-4">
                    <AiOutlineClose color="gray" size={24} className="cursor-pointer" onClick={onClose} />
                </div> */}

                {/* Large screen header - profile pic, logo, bell icon */}
                <div className="hidden lg:block mb-6">
                    {/* Logo */}
                    <div className="mb-8">
                        <Link href="/feed">
                            <Image
                                src="/yattr.png"
                                alt="SCAH Logo"
                                width={60}
                                height={30}
                                priority
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-3">
                        <Link href={`/profile`} className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border">
                                <Image
                                    src={user?.profilePicture || '/defaultImage.jpg'}
                                    alt="Profile Picture"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                            <p className="font-semibold text-base text-black truncate">{user?.name}</p>
                            <p className="text-xs text-gray-600 truncate">{user?.organization}</p>
                            <p className="text-xs text-gray-600 truncate">
  {user?.location?.city}, {user?.location?.state}, {user?.location?.country}
</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation - takes remaining space */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <nav className="w-full">
                    <ul className="space-y-1">
                        {navroutes.map((route) => {
                            const isActive = pathname === route.path;
                            return (
                                <li key={route.path}>
                                    <Link
                                        href={route.path}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                                            isActive 
                                                ? "bg-teal-500 text-white" 
                                                : "text-gray-700 hover:bg-gray-200/50 hover:text-gray-700"
                                        }`}
                                    >
                                        <span className={`flex-shrink-0 ${
                                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700' 
                                        }`}>
                                            {route.icon} 
                                        </span>
                                        <span className="text-sm font-medium">{route.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};
export default Sidenav;