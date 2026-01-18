'use client';
import Sidenav from "./components/sidenav";
import React, { useState } from "react";
import Suggestions from "./feed/trialsAndSuggestions/page";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


export default function FeedLayout({ children}) {
     const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);
    return(
        <div className="min-h-screen">
            <div className="flex flex-row h-screen">
                {/* Mobile hamburger menu button */}
                <div className={`lg:hidden fixed top-4 left-4 z-30 transition-opacity duration-300 ${nav ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <AiOutlineMenu color="black" size={30} onClick={handleNav} />
                </div>

                {/* Sidebar */}
                <div className={`
                    w-80 lg:w-1/5
                    fixed left-0 top-0 h-full 
                    transform transition-transform duration-300 ease-in-out 
                    shadow-lg z-20 bg-white
                    ${nav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Sidenav onClose={handleNav} />
                    
                </div>

                {/* Main content area */}
                <div className="flex-1 lg:ml-[20%] lg:mr-[20%] ml-0 overflow-y-auto no-scrollbar h-screen">
                        {children}
                </div>

                {/* Right sidebar space for large screens */}
                <div className="hidden lg:block w-1/5 fixed right-0 top-0 h-screen overflow-y-auto p-4 pt-16">
                <Suggestions/>
                </div>
            </div>
           
        </div>
    )
};