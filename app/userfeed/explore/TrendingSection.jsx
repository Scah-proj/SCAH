"use client";
import TrendingCarousel from "./TrendingCarousel";

export default function TrendingSection() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">🔥 Trending on SCAH</h2>
      <p className="text-gray-500 text-md text-semibold">What scouts and academies are engaging with</p>
      <TrendingCarousel />
    </div>
  );
}
