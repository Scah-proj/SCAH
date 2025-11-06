"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { navroutes } from "./navroutes";
import { BellPlus } from "lucide-react";
import { AiOutlineClose } from 'react-icons/ai';


const Sidenav = ({ onClose }) => {
    const pathname = usePathname();

    return (
        <div className="relative h-screen mx-4">
            <div className="pt-15">
                {/* Mobile header - close button on the right */}
                <div className="lg:hidden flex justify-end items-center mb-4 pr-4">
                    <AiOutlineClose color="gray" size={24} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Large screen header - profile pic, logo, bell icon */}
                <div className="hidden lg:flex justify-between items-center mb-6 p-4">
                    {/* Profile Picture */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
                        <Link href="/profile">
                        <Image
                            src="/wen.webp"
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                        </Link>
                    </div>

                    {/* Logo */}
                    <Link href="/feed">
                        <Image
                            src="/yattr.png"
                            alt="SCAH Logo"
                            width={80}
                            height={30}
                            priority
                            className="object-contain"
                        />
                    </Link>

                    {/* Bell Icon */}
                    <div>
                        <BellPlus 
                            size={24}
                            className="text-gray-500"/>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[-12] border border-gray-300 h-5/6 w-full pt-15">
                    <nav className="w-full">
                        <ul className="space-y-2">
                            
                            {navroutes.map((route) => {
                                const isActive = pathname === route.path;
                                return (
                                <li key={route.path}>
                                    <Link
                                        href={route.path}
                                        className={`group block m-4 p-3 border border-gray-300 rounded-sm text-gray-700 hover:text-white ${
                                            isActive ? "bg-teal-500 border-none text-white" : "hover:bg-teal-500 hover:text-white"
                                        }`}
                                    >
                                        <div className="flex">
                                            <span className={`mr-2 ${
                                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-white' 
                                        }`}>
                                            {route.icon} 
                                            </span>
                                            <span className="text-sm font-medium">{route.label}</span>


                                        </div>
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

