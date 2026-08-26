import React from "react";
import Image from "next/image";

const Body = () => {
  const features = [
    {
      title: "Scouting Hub",
      image: "/Frame 20.png",
      description:
        "Scout smarter, not harder with better and easy accessibility to tools.",
    },
    {
      title: "Smart Agent Matching",
      image: "/Frame 23.png",
      description:
        "Our algorithm matches players with the right representatives based on playing style, career goals, and market positioning",
    },
    {
      title: "Spotlight",
      image: "/Frame 24.png",
      description:
        "Showcase your skills. Shape your future. Access every match you’ve played, build personal highlight reels, track your performance, and create a standout profile that gets noticed.",
    },
    {
      title: "Match Footage Access",
      image: "/Frame 25.png",
      description:
        "Never Miss a Moment of Brilliance with comprehensive video libraries that help scouts identify talent faster",
    },
    {
      title: "Game-Changing Insights from Coaches",
      image: "/Frame 26.png",
      description:
        "Smarter analysis. Better results. Get tactical insights and player-specific video clips. Analyse full matches and fine-tune strategies with visual data that supports every coaching decision.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-800">
         Every Player Deserves To Be Seen
        </h1>
        <p className="text-teal-600 mt-4">
         You've put in the work. Now let us put you in front of the right people.
          Our intelligent matching system turns years of dedication into career.
        </p>
      </div>

      {/* First Row - 2 items */}
      <div className="w-full max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {features.slice(0, 2).map((feature, index) => (
          <div
            key={index}
            className="p-4 flex flex-col bg-white rounded-lg shadow-md"
          >
            <div className="relative w-full h-60 sm:h-72 md:h-80">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row - 3 items */}
      <div className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.slice(2).map((feature, index) => (
          <div
            key={index + 2}
            className="p-4 flex flex-col bg-white rounded-lg shadow-md"
          >
            <div className="relative w-full h-60 sm:h-72 md:h-80">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
