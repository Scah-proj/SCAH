export default function CoreSkillsDisplay({ coreSkills, isOwnProfile = false }) {
   
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
      <div className="my-4 p-6 border border-gray-200 rounded-md text-center text-gray-500">
        <p>No core skills added yet</p>
        {isOwnProfile && (
          <p className="text-sm mt-2">Add your core skills in Edit Profile</p>
        )}
      </div>
    );
  }

  return (
    <div className="my-4">
      <h3 className="text-xl font-semibold mb-4">Core Skills</h3>
      <div className="flex flex-wrap gap-2">
        {coreSkills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 rounded-md border border-teal-700"
          >
            {skillLabels[skill] || skill}
          </span>
        ))}
      </div>
    </div>
  );
}