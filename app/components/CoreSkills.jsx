"use client";
import { useState } from "react";

export default function CoreSkillsDisplay({ coreSkills, isOwnProfile }) {
   const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 6;

  const skillLabels = {
    speed: 'Speed',
    agility: 'Agility',
    endurance: 'Endurance',
    strength: 'Strength',
    explosiveness: 'Explosiveness',
    balance_coordination: 'Balance & Coordination',
    reaction_time: 'Reaction Time',
    mental_toughness: 'Mental Toughness',
    discipline: 'Discipline',
    focus_concentration: 'Focus & Concentration',
    confidence: 'Confidence',
    resilience: 'Resilience',
    adaptability: 'Adaptability',
    determination: 'Determination',
    decision_making: 'Decision-Making',
    spatial_awareness: 'Spatial Awareness',
    anticipation: 'Anticipation',
    positioning: 'Positioning',
    timing: 'Timing',
    reading_the_game: 'Reading the Game',
    creativity_in_play: 'Creativity in Play',
    communication: 'Communication',
    leadership: 'Leadership',
    team_collaboration: 'Team Collaboration',
    coachability: 'Coachability',
    reliability: 'Reliability',
    work_ethic: 'Work Ethic',
    sportsmanship: 'Sportsmanship',
    accountability: 'Accountability',
    consistency: 'Consistency',
    self_discipline: 'Self-Discipline',
    time_management: 'Time Management',
    drive_for_improvement: 'Drive for Improvement',
    persistence: 'Persistence',
    positive_attitude: 'Positive Attitude',
  };

  if (!coreSkills || coreSkills.length === 0) {
    return (
      <div className="my-4 p-6 text-center text-gray-500">
        <p>No core skills added yet</p>
        {isOwnProfile && (
          <p className="text-sm mt-2">Add your core skills in Edit Profile</p>
        )}
      </div>
    );
  }

  const visibleSkills = showAll
    ? coreSkills
    : coreSkills.slice(0, MAX_VISIBLE);

  return (
     <div className="mb-16">
      <h3 className="text-lg font-semibold mb-4">Core Strength</h3>

      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 rounded-full border border-teal-600 text-sm"
          >
           {skillLabels[skill] || skill}
          </span>
        ))}
      </div>

      {coreSkills.length > MAX_VISIBLE && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-3 text-sm font-medium text-teal-600 hover:underline"
        >
          {showAll ? "Show less" : `Show more (${coreSkills.length - MAX_VISIBLE})`}
        </button>
      )}
    </div>
  );
}