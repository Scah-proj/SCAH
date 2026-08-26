'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Endcontact from '../components/Endcontact';

const Contact = () => {
  const partRef = useRef(null);

  const scrollToPart = () => {
    partRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
   <div
  className="relative w-full min-h-[100dvh] overflow-hidden bg-cover bg-center sm:bg-top bg-no-repeat"
  style={{
    backgroundImage: `url('/balll.webp')`,
  }}
>

      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[700px]">
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-4 sm:px-8 md:px-16 lg:px-20 text-left">
          <motion.h1
            className="text-white  text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch with SCAH
          </motion.h1>

          <motion.p
            className="text-white text-base sm:text-lg mt-4 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Connect with us for partnerships, support, and safeguarding inquiries.
          </motion.p>
         <motion.a
          href="mailto:support@scah.club"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-teal-900 border border-teal-900 shadow-lg text-xl text-white rounded-lg font-semibold hover:bg-transparent transition inline-block text-center"
>
            View Contact Info
            </motion.a>

        </div>
      </div>

      {/* Contact Info Section */}
      

      {/* Footer or Endcontact Section */}
      <div ref={partRef} className="relative z-30">
        <Endcontact />
      </div>
    </div>
  );
};

export default Contact;
