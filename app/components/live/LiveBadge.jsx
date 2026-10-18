"use client";

import React from "react";

export default function LiveBadge({ size = "md", viewers = null, className = "" }) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm font-semibold",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-rose-600 text-white font-bold tracking-wider uppercase shadow-md ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <span>LIVE</span>
      {viewers !== null && (
        <span className="pl-1 border-l border-white/30 text-[11px] font-normal lowercase">
          {viewers}
        </span>
      )}
    </div>
  );
}
