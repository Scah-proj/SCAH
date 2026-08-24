"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EndOfFeed() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <DotLottieReact
        src="/animations/Checkmark.lottie"
        loop
        autoplay
        className="h-32 w-32"
      />

      <h3 className="mt-3 text-lg font-semibold text-gray-900">
        You're all caught up
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        You've reached the end of your feed. Check back later for
        more updates from the community.
      </p>
    </div>
  );
}