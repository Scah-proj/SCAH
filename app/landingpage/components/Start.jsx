import React from 'react';

const Start = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-10 items-center justify-center h-[300px] bg-teal-900 px-4">
      <p className="text-2xl sm:text-4xl text-center sm:text-left text-gray-300 font-bold">
        Ready to Change the Game?
      </p>

      <div className="flex items-center justify-center">
        <a href="/auth/register">
          <button className="rounded-3xl py-2 px-6 font-semibold text-xl text-gray-200 bg-teal-600 hover:scale-105 active:scale-95 transition-transform duration-200">
            Start your journey
          </button>
        </a>
      </div>
    </div>
  );
};

export default Start;
