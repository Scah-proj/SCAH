'use client';
import React, { useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Part from '../landingpage/components/Part';
import Endcontact from '../landingpage/components/Endcontact';
import NavbarWithScroll from '../landingpage/Pages/Navbarscroll';


const Page = () => {
  const partRef = useRef(null);

  const scrollToPart = () => {
    partRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <NavbarWithScroll/>
      <div className="relative w-full bg-black min-h-screen overflow-hidden">
      {/* 🎥 Background Video Section */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/fallback.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-75"
        >
          <source src="/video.mp4" type="video/mp4" />
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 ">
          <motion.h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elevating Young Talent.
          </motion.h1>

          <motion.p
            className="text-white text-base sm:text-lg mt-4 max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We are dedicated to empowering the next generation of athletes by providing cutting-edge technology,
            data-driven insights, and meaningful opportunities that bridge the gap between raw talent and professional achievement.
          </motion.p>

          <motion.button
            onClick={scrollToPart}
            className="mt-6 px-6 py-3 bg-teal-800 text-white hover:bg-transparent border border-teal-800  rounded-full hover:cursor-pointer font-semibold  transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* ⬇️ Content after video */}
      <div ref={partRef} className="relative z-30">
        <Suspense fallback={<div className="text-white ">Loading content...</div>}>
          <Part/>
          <Endcontact/>
        </Suspense>
      </div>
    </div>
    </div>
    
  );
};

export default Page;
