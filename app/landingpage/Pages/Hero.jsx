import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Body from '../components/Body';
import Start from '../components/Start';
import NewsletterForm from '../components/Newsletterform';
import Endcontact from '../components/Endcontact';

const images = ['/coa.webp', '/roa.webp', '/toa.webp'];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className='min-h-screen bg-[#F4F2EE] py-16 px-4 sm:px-10'>
           <div className="relative h-[900px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            loading={index === current ? 'eager' : 'lazy'} // ✅ lazy loading
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            initial={false}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-20" />

        {/* Hero Content */}
        <motion.div
          className="relative z-30 flex flex-col justify-center items-start h-full px-10 sm:px-20 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.p
            className="text-3xl sm:text-4xl mb-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            THE SPOTLIGHT FOR TOMORROW'S
          </motion.p>

          <motion.p
            className="text-3xl sm:text-4xl mb-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            SPORTS TALENT
          </motion.p>

          <motion.p
            className="text-base sm:text-lg mb-10 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Bridging the gap between grassroots talents and the professional game.
          </motion.p>

          <a href="/mission">
            <motion.div
              className="bg-teal-800 p-4 rounded-3xl text-sm sm:text-lg py-3 sm:py-5 text-white font-semibold cursor-pointer hover:bg-transparent border border-teal-800 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Discover more
            </motion.div>
          </a>
        </motion.div>
      </div>
      </div>

      {/* HERO SECTION */}
   

      {/* FOLLOW-UP CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Body />
        <Start />
        <NewsletterForm />
        <Endcontact />
      </motion.div>
    </div>
  );
};

export default Hero;
