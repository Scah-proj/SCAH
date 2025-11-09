'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    setMessage('');
    if (!email || !email.includes('@')) {
      return setMessage('❌ Please enter a valid email.');
    }
    if (!role || role === 'please specify') {
      return setMessage('❌ Please select a role.');
    }

    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ You’re Subscibed');
        setEmail('');
        setRole('');
      } else {
        if (res.status === 400 && data?.error?.toLowerCase().includes('already')) {
          setMessage('This email exists with us.');
        } else {
          setMessage(data?.error || "❌Couldn't add email.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        className="h-[950px] sm:h-[700px] flex flex-col justify-between bg-gray-50 my-auto pt-13"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <main className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2 w-full flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-xl text-center">
              <h1 className="text-2xl sm:text-4xl font-semibold">
               The Complete Talent Intelligence Platform
              </h1>
             

              <p className="mt-6 text-base sm:text-lg font-medium text-gray-700">
               Building the future of talent discovery. Subscribe to our newsletter for the latest updates.
              </p>

              {/* Waitlist Form */}
              <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-2xl mx-auto">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-800"
                >
                  <option>I am.....</option>
                  <option>Athlete</option>
                  <option>Scout</option>
                </select>

                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  className="w-full p-3 rounded-lg border shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  
                  disabled={loading}
                  className="bg-teal-800 text-white w-full py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-200"
                >
                  {loading ? 'Submitting...' : 'Subscribe'}
                </button>

                {message && (
                  <p className="mt-2 text-sm font-medium text-teal-800">{message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 w-full flex items-center justify-center px-4 pb-6 md:pb-0">
            <div className="relative w-full max-w-[400px] sm:max-w-md md:max-w-xl h-[350px] sm:h-[300px] md:h-[500px] overflow-hidden rounded-3xl shadow-xl bg-transparent">
              <Image
                src="/Frame 38.png"
                alt="backto"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default Waitlist;
