'use client';
import React, { useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Commune from '../landingpage/components/Commune';
import Endcontact from '../landingpage/components/Endcontact';
import NavbarWithScroll from '../landingpage/Pages/Navbarscroll';

// Lazy-loaded components

const Page = () => {
  const partRef = useRef(null);

  const scrollToPart = () => {
    partRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
        <NavbarWithScroll/>
        <div className="relative w-full bg-black min-h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/basket.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />


        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-8 md:px-16 lg:px-20 text-left">
          <motion.h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect Compete Grow together
          </motion.h1>

          <motion.p
            className="text-white text-base sm:text-lg mt-4 max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join a global network of athletes, scouts, and coaches.
            Share your journey, connect with others, and grow through real conversation.
             Your next breakthrough could start here.
          </motion.p>

          <a href="/auth/register">
            <motion.button
              
              className="mt-6 px-6 py-3 bg-teal-800 border border-teal-800 shadow-lg text-xl text-white rounded-3xl hover:cursor-pointer font-semibold hover:bg-transparent transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started
            </motion.button>
          </a>
        </div>
      </div>

      {/* ⬇️ Lazy-loaded Part Section */}
      <div ref={partRef} className="relative z-30 ">
        <Suspense fallback={<div className="text-white p-6 text-center">Loading content...</div>}>
          {/* <Commune /> */}
          <Endcontact />
        </Suspense>
      </div>
    </div>
    </div>
    
  );
};

export default Page;
