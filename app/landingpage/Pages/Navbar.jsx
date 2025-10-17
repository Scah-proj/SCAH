'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import Image from 'next/image';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname() || '/home';
  React.useEffect(() => {
    if (pathname === '/') {
      window.location.replace('/home');
    }
  }, [pathname]);
  const navLinks = [
    { name: 'Home', to: '/home' },
    { name: 'Mission', to: '/mission' },
    { name: 'Community', to: '/community' },
    { name: 'Join us', to: '/join' },
    { name: 'Contact', to: '/contact' },
  ];

  const isActive = (path) => pathname === path;
  const handleNav = () => setNav(!nav);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-50 shadow-md rounded-4xl shadow-teal-500 ">
      <div className="flex justify-between items-center h-20 w-full px-8 font-semibold text-xl text-gray-800">
        <Link href="/home">
          <Image
            src="/yattr.png"
            alt="SCAH Logo"
            width={80}
            height={30}
            priority
            className="object-contain"
          />
        </Link>

        <ul className="hidden lg:flex">
          {navLinks.map(({ name, to }) => (
            <li key={to} className="p-4 hover:scale-105 transition-transform">
              <Link
                href={to}
                className={`transition-colors duration-300 ${
                  isActive(to) ? 'text-teal-700' : 'text-gray-800 hover:text-teal-600'
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-3 p-3 group">
          <Link href="/auth/register">
            <button className="bg-teal-800 hover:bg-transparent text-white hover:text-teal-800 text-sm border in-hover:cursor-pointer border-teal-800 py-2 px-4 h-10 rounded-xl flex items-center gap-2 transition-all duration-300">
              <IoPerson size={20} className="text-white group-hover:text-teal-800" />
              Sign up
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-teal-800 hover:bg-transparent text-white hover:text-teal-800 text-sm border hover:cursor-pointer border-teal-800 py-2 px-4 h-10 rounded-xl flex items-center gap-2 transition-all duration-300">
              <IoPerson size={20} className="text-white group-hover:text-teal-800" />
              Sign in
            </button>
          </Link>
        </div>

        <div className="block lg:hidden z-20 pt-6">
          {!nav && <AiOutlineMenu color="black" size={30} onClick={handleNav} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 w-full h-full bg-gray-50 z-30 p-4 flex flex-col justify-between md:hidden transform transition-transform duration-500 ease-in-out ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-4">
            <Image src="/yattr.png" alt="SCAH Logo" width={80}
            height={30} className="object-contain" />
            <AiOutlineClose color="gray" size={25} className="cursor-pointer" onClick={handleNav} />
          </div>

          <ul className="mb-6">
            {navLinks.map(({ name, to }) => (
              <li key={to} className="p-4">
                <Link
                  href={to}
                  className={`block transition-colors duration-300 ${
                    isActive(to) ? 'text-teal-800' : 'text-gray-800 hover:text-teal-700'
                  }`}
                  onClick={handleNav}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/auth/login" onClick={handleNav}>
            <span className="block text-center px-4 py-2 border border-gray-900 text-gray-900 rounded hover:bg-white hover:text-black transition">
              Sign in
            </span>
          </Link>
          <Link href="/auth/register" onClick={handleNav}>
            <span className="block text-center px-4 py-2 border border-gray-900 text-gray-900 rounded hover:bg-white hover:text-black transition">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
