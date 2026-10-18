import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Endcontact from '../components/Endcontact';

const images = [
  '/wen.webp',
  '/amerball.webp',
  '/ken.webp',
];

const Join = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  // Preload images to prevent flicker
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setMessage('❌ Please enter a valid email.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (process.env.NEXT_PUBLIC_DISABLE_BACKEND === "true" || !process.env.NEXT_PUBLIC_API_URL) {
        await new Promise((r) => setTimeout(r, 400));
        setMessage("✅ You’ve been added to the waitlist (Mock Mode)!");
        setEmail("");
        setLoading(false);
        return;
      }

      const res = await fetch('/api/v1/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ You’ve been added to the waitlist!');
        setEmail('');
      } else {
        setMessage(data?.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-between bg-[#F4F2EE]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >


      <main className=" flex flex-col md:flex-row">
        {/* Left: Text & Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl text-center">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
              <p className="text-3xl pt-10 sm:pt-0 sm:text-4xl font-semibold">Scout,</p>
              <p className="text-3xl sm:text-4xl font-semibold">
                Spot and Develop Talent
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-semibold mt-2">— All in one place</p>

            <p className="mt-6 text-base sm:text-lg font-medium text-gray-700">
              Welcome to SCAH, the all-in-one scouting hub unlocking hidden youth talent through data,
              video, and performance tools. Join the next-gen platform built for scouts, coaches, and rising athletes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-col items-center gap-4 sm:gap-6 w-full max-w-lg mx-auto">
               <select className="w-full p-2  rounded-lg py-1 px-3 shadow-md border border-gray-300 shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-800">
                <option>I am  </option>
               <option>I am an Athlete </option>
               <option>I am a Coach</option>
                <option>I am a Scout</option>
            
          </select>
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="flex-1 w-full p-3 rounded-lg shadow-md text-gray-800 placeholder-gray-500 placeholder: focus:outline-none focus:ring-2 focus:ring-teal-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-teal-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-800 transition-all duration-200 w-full sm:w-auto"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </div>

            {message && (
              <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
            )}
          </div>
        </div>

        {/* Right: Crossfade Image Slideshow */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-6">
          <div className="relative w-full max-w-md h-[300px] md:h-[400px] overflow-hidden rounded-3xl  shadow-xl bg-transparent">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImage]}
                src={images[currentImage]}
                alt="Slideshow"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Endcontact />
    </motion.div>
  );
};

export default Join;
