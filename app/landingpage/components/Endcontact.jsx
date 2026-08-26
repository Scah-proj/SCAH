import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';

const Endcontact = () => {
  return (
    <footer className="bg-teal-900 text-gray-200 px-6 sm:px-8 py-5">
      {/* Top Section */}
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-start gap-y-10 gap-x-5 flex-wrap">
        
        {/* Logo */}
        <motion.div
          className="flex  gap-2 self-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
         <Image
                     src="/yattr.png"
                     alt="SCAH Logo"
                     width={80}
                     height={30}
                     priority
                     className="object-contain"
                   />
        </motion.div>

        {/* Legal */}
        <motion.div
          className="flex flex-col gap-2 self-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h4 className="font-semibold text-lg">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Terms and conditions</a></li>
            <li><a href="#" className="hover:underline">Scah Cookie Policy</a></li>
            <li><a href="#" className="hover:underline">Privacy policy</a></li>
          </ul>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex flex-col gap-2 self-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h4 className="font-semibold text-lg">SCAH</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/home" className="hover:underline">Homepage</a></li>
            <li><a href="/mission" className="hover:underline">Mission</a></li>
            <li><a href="/community" className="hover:underline">Community</a></li>
            <li><a href="/join" className="hover:underline">Join</a></li>
            <li><a href="/contact" className="hover:underline">Contacts</a></li>
          </ul>
        </motion.div>

        {/* Account */}
        <motion.div
          className="flex flex-col gap-2 self-start pr-30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h4 className="font-semibold text-lg">Account</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/auth/login" className="hover:underline">Sign in</a></li>
            <li><a href="/auth/register" className="hover:underline">Sign up</a></li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Note + Socials */}
      <div className="w-full mx-auto flex flex-col sm:flex-row justify-between items-center mt-10 gap-6 sm:gap-8 text-start">
         <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* <a href="#" className="text-gray-300 hover:text-gray-600"><FaFacebookF size={20} /></a> */}
          <a href="https://www.instagram.com/scah.club" className="text-gray-300 hover:text-gray-600"><FaInstagram size={20} /></a>
          <a href="https://www.linkedin.com/company/scah-club" className="text-gray-300 hover:text-gray-600"><FaLinkedinIn size={20} /></a>
          <a href="https://x.com/Scahclub" className="text-gray-300 hover:text-gray-600"><FaXTwitter size={20} /></a>
          
        </motion.div>
        <p className="text-md pr-0 sm:pr-30 text-gray-300">SCAH ©2026</p>

       
      </div>
    </footer>
  );
};

export default Endcontact;
