"use client";
import { useState } from "react";

export default function TechnicalSkillDisplay({ technicalSkills, isOwnProfile = false }) {
   
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 6;

  const technicalSkillLabels = {
  // Ball Control
  ball_control: 'Ball Control',
  first_touch: 'First Touch',
  close_control: 'Close Control / Tight-Space Handling',
  dribble_control: 'Dribble Control',
  change_of_direction_dribbling: 'Change-of-Direction Dribbling',
  weak_foot_handling: 'Weak-Foot / Weak-Hand Handling',

  // Passing
  short_pass_accuracy: 'Short Pass Accuracy',
  long_pass_accuracy: 'Long Pass Accuracy',
  quick_decision_passing: 'Quick-Decision Passing',
  creative_playmaking: 'Creative Playmaking',
  field_vision: 'Court Vision / Field Vision',
  through_ball_timing: 'Through-Ball / Lead-Pass Timing',

  // Shooting/Scoring
  finishing_accuracy: 'Finishing Accuracy',
  one_touch_finishing: 'One-Touch Finishing',
  long_range_shooting: 'Long-Range Shooting',
  pull_up_shooting: 'Pull-Up Shooting / Finishing at the Rim',
  catch_and_shoot: 'Catch-and-Shoot Accuracy',
  red_zone_efficiency: 'Red-Zone Efficiency',

  // Movement
  off_ball_movement: 'Off-Ball Movement',
  positioning_awareness: 'Positioning Awareness',
  movement_iq: 'Movement IQ',
  separation_ability: 'Separation Ability',
  route_running_precision: 'Route Running Precision',

  // Defense
  on_ball_defense: 'On-Ball Defense',
  defensive_positioning: 'Defensive Positioning',
  marking_coverage: 'Marking / Coverage Discipline',
  interception_timing: 'Interception Timing',
  tackling_technique: 'Tackling Technique',
  shot_contest_technique: 'Shot Contest Technique',

  // Ball Security
  ball_security: 'Ball Security',
  composure_under_pressure: 'Composure in Tight Situations',
  secure_catching: 'Secure Catching',

  // Aerial
  aerial_control: 'Aerial Control',
  high_point_catching: 'High-Point Catching',

  // Set Pieces
  set_piece_delivery: 'Free-Kick / Set-Piece Delivery',
};
  if (!technicalSkills || technicalSkills.length === 0) {
    return (
      <div className="my-4 p-6 border border-gray-200 rounded-md text-center text-gray-500">
        <p>No Technical Skill added yet</p>
        {isOwnProfile && (
          <p className="text-sm mt-2">Add your Technical Skill in Edit Profile</p>
        )}
      </div>
    );
  }

   const visibleSkills = showAll
    ? technicalSkills
    : technicalSkills.slice(0, MAX_VISIBLE);


  return (
     <div className="mb-16">
      <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>

      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 rounded-full border border-teal-600 text-sm"
          >
           {technicalSkillLabels[skill] || skill}
          </span>
        ))}
      </div>

      {technicalSkills.length > MAX_VISIBLE && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-3 text-sm font-medium text-teal-600 hover:underline"
        >
          {showAll ? "Show less" : `Show more (${technicalSkills.length - MAX_VISIBLE})`}
        </button>
      )}
    </div>
  );
}