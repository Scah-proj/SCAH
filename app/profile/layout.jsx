'use client';
import Sidenav from "../userfeed/components/sidenav";
import React, { useState } from "react";
import Image from 'next/image';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


export default function FeedLayout({ children}) {
     const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);
    return(
        <div className="min-h-screen">
            <div className="flex flex-row h-screen">
                {/* Mobile hamburger menu button */}
                <div
  className={`
    lg:hidden fixed top-4 left-4 z-30
    bg-white/10 backdrop-blur
    p-2 rounded-md shadow
    transition-opacity duration-300
    ${nav ? 'opacity-0 pointer-events-none' : 'opacity-100'}
  `}
>
  <AiOutlineMenu
    size={26}
    className="text-gray-700"
    onClick={handleNav}
  />
</div>


                {/* Sidebar */}
                <div className={`
                    w-80 lg:w-1/6 
                    fixed left-0 top-0 h-full 
                    transform transition-transform duration-300 ease-in-out 
                    shadow-lg z-20 bg-white
                    ${nav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Sidenav onClose={handleNav} />
                </div>

                {/* Main content area */}
                <div className="flex-1 lg:ml-[16.6667%] lg:w-5/6 ml-0">
                    <div className="lg:ml-0 ml-0 w-full">
                        {children}
                    </div>
                </div>

                
            </div>
           
        </div>
    )
};