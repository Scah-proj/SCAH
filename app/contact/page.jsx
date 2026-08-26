'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdMail } from "react-icons/io";

import NavbarWithScroll from '../landingpage/Pages/Navbarscroll';
import Endcontact from '../landingpage/components/Endcontact';

const Page = () => {
  const partRef = useRef(null);
  const heroRef = useRef(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Lazy load background image when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgLoaded(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <NavbarWithScroll />

      <div
        ref={heroRef}
        className={`relative w-full min-h-[100dvh] overflow-hidden bg-cover bg-center sm:bg-top bg-no-repeat transition-opacity duration-1000 ${
          bgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: bgLoaded ? `url('/balll.webp')` : 'none',
        }}
      >
        <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[700px]">
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-start justify-center h-full px-4 sm:px-8 md:px-16 lg:px-20 text-left">
            <motion.h1
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Get in Touch with SCAH
            </motion.h1>

            <motion.p
              className="text-white text-base sm:text-lg mt-4 max-w-2xl font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Connect with us for partnerships, support, and safeguarding inquiries.
            </motion.p>

            <motion.p
              className="text-white text-md flex gap-4 sm:text-base mt-10 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <IoMdMail size={30} className="" />
               support@scah.club
            </motion.p>
          </div>
        </div>

        {/* Footer or Endcontact Section */}
        <div ref={partRef} className="relative z-30">
          <Endcontact />
        </div>
      </div>
    </div>
  );
};

export default Page;
