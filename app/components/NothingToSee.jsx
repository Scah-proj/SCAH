"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NothingToSee({ title = "Nothing to see here", description = "There isn't anything to show here right now. Check back later or explore other sections." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <DotLottieReact
        src="/animations/empty.lottie"
        loop
        autoplay
        className="h-32 w-32"
      />

      <h3 className="mt-3 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}