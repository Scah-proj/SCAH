'use client';

import Sidenav from "../userfeed/components/sidenav";
import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function ProfileLayout({ children }) {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav((open) => !open);

  return (
    <div className="min-h-dvh">
      <header className="lg:hidden fixed inset-x-0 top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <button type="button" onClick={toggleNav} aria-label={nav ? "Close navigation" : "Open navigation"} aria-expanded={nav} className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        <Link href="/userfeed" aria-label="SCAH home">
          <Image src="/yattr.png" alt="SCAH Logo" width={70} height={32} priority className="object-contain" />
        </Link>
        <span className="w-10" aria-hidden="true" />
      </header>

      <div className={`fixed left-0 top-0 z-20 h-dvh w-[min(20rem,85vw)] bg-white shadow-lg transition-transform duration-300 ease-in-out lg:w-1/6 ${nav ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidenav onClose={() => setNav(false)} />
      </div>
      {nav && <button type="button" aria-label="Close navigation" onClick={() => setNav(false)} className="fixed inset-0 z-10 bg-black/40 lg:hidden" />}

      <main className="min-h-dvh min-w-0 pt-16 lg:ml-[16.6667%] lg:w-5/6 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
