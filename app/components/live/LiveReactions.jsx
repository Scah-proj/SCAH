"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flame, Trophy, Sparkles } from "lucide-react";

const REACTION_EMOJIS = [
  { id: "heart", label: "Heart", icon: Heart, color: "text-rose-500 fill-rose-500" },
  { id: "fire", label: "Fire", icon: Flame, color: "text-amber-500 fill-amber-500" },
  { id: "trophy", label: "Trophy", icon: Trophy, color: "text-yellow-400 fill-yellow-400" },
  { id: "sparkle", label: "Star", icon: Sparkles, color: "text-teal-400 fill-teal-400" },
];

export default function LiveReactions({ onReact, className = "" }) {
  const [activeReactions, setActiveReactions] = useState([]);

  const triggerReaction = (reaction) => {
    const newId = `${Date.now()}_${Math.random()}`;
    const randomX = (Math.random() - 0.5) * 80; // random drift left/right -40px to +40px
    const randomRotate = (Math.random() - 0.5) * 40;

    setActiveReactions((prev) => [
      ...prev.slice(-20), // keep max 20 active on screen
      { id: newId, reaction, x: randomX, rotate: randomRotate },
    ]);

    if (onReact) {
      onReact(reaction.id);
    }
  };

  // Auto clean up after 2 seconds
  useEffect(() => {
    if (activeReactions.length === 0) return;
    const timer = setTimeout(() => {
      setActiveReactions((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeReactions]);

  return (
    <div className={`relative ${className}`}>
      {/* Floating animations container */}
      <div className="pointer-events-none absolute bottom-16 right-2 w-32 h-80 overflow-visible flex flex-col justify-end items-center z-30">
        <AnimatePresence>
          {activeReactions.map((item) => {
            const Icon = item.reaction.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 0, x: item.x, scale: 0.6, rotate: 0 }}
                animate={{
                  opacity: 0,
                  y: -260,
                  x: item.x * 1.5,
                  scale: [0.6, 1.2, 1],
                  rotate: item.rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className={`absolute bottom-0 ${item.reaction.color} filter drop-shadow-lg`}
              >
                <Icon size={32} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Reaction buttons row */}
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-lg">
        {REACTION_EMOJIS.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => triggerReaction(r)}
              className="p-2 rounded-full hover:bg-white/20 active:scale-125 transition-transform cursor-pointer"
              aria-label={r.label}
            >
              <Icon size={20} className={r.color} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
