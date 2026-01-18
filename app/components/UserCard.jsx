"use client";
import Link from "next/link";
import { useState } from "react";



export default function UserCard({profile}) {
  return (
    <div className="max-w-2xl mx-auto mb-6">
        <Link href={`/profile/${profile.id}`}>
        
      <div className="p-2 flex items-center gap-3 border rounded mb-2">
    <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full" />
    <p>{profile.name}</p>
  </div>
        </Link>

    </div>
  );
}
