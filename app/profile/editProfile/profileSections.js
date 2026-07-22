import { IoMdContact } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { FaMedal } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa";


const SPORTS = [
  "Football",
  "Soccer",
  "Basketball",
  "Tennis",
  "Athletics",
  "Swimming",
  "Volleyball",
  "Handball",
  "Rugby",
  "Cricket",
  "Baseball",
  "Hockey",
  "Badminton",
  "Table Tennis",
  "Golf",
  "Boxing",
  "Martial Arts",
  "Cycling",
  "Other",
];
const sportOptions = SPORTS.map((s) => ({ label: s, value: s }));

// Both schemas use the same 4-value GENDERS enum. Previously only 2 of the
// 4 were offered as options.
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const genderOptions = GENDERS.map((g) => ({ label: g, value: g }));

// Athlete.currentPlayingLevel
const PLAYING_LEVELS = [
  "Local Clubs",
  "School Teams",
  "Academy Programs",
  "Semi-Professionals",
  "Professional",
  "Just starting",
];
const playingLevelOptions = PLAYING_LEVELS.map((l) => ({ label: l, value: l }));

// Scout.scoutingLevel
const SCOUTING_LEVELS = [
  "Local Clubs",
  "School Teams",
  "Academy Programs",
  "Semi-Professionals",
  "Professional",
  "Just starting",
];
const scoutingLevelOptions = SCOUTING_LEVELS.map((l) => ({ label: l, value: l }));

export const profileSections = [
  {
    id: "basic-info",
    title: "Personal Information",
    icon: <IoMdContact size={28} color="teal" />,
    fields: [
      { type: "text", label: "Full Name", name: "name" },
      { type: "date", label: "D.O.B", name: "dob" },
      {
        type: "select",
        label: "Position",
        name: "scoutPosition",
        userType: "Scout",
        options: [
          { label: "Scout", value: "Scout" },
          { label: "Coach", value: "Coach" },
          { label: "Recruiter", value: "Recruiter" },
        ],
      },
      {
        type: "select",
        label: "Gender",
        name: "gender",
      
        options: genderOptions,
      },
      { type: "nationality", label: "Nationality", name: "nationality" },
      { type: "location", label: "Residence", name: "residence" },
    ],
  },

  {
    id: "contact",
    title: "Contact Information",
    icon: <FiPhone size={24} color="teal" />,
    fields: [
      { type: "text", label: "Email", name: "email" },
      { type: "phone", label: "Tel. No.", name: "phone" },
      { type: "text", label: "ID", name: "athleteId", userType: "Athlete" },
      {
        type: "select",
        label: "Organization",
        name: "organization",
        userType: "Scout",
        options: [
          { label: "Club", value: "Club" },
          { label: "Academy", value: "Academy" },
          { label: "Agency", value: "Agency" },
          { label: "School", value: "School" },
          { label: "Federation", value: "Federation" },
        ],
      },
      
      { type: "textarea", label: "Bio", name: "bio" },
    ],
  },

  {
    id: "athletic",
    title: "Athletic Details",
    icon: <FaMedal size={24} color="teal" />,
    role: "athlete",
    fields: [
      {
        type: "select",
        label: "Primary Sport",
        name: "primarySport",
        // FIXED: full SPORTS enum, "Soccer" removed (invalid value).
        options: sportOptions,
      },
      { type: "select", label: "Position", name: "athletePosition", options: [] },
      // ADDED: Athlete.currentPlayingLevel — already whitelisted on the
      // backend, previously had no UI at all.
      {
        type: "select",
        label: "Current Playing Level",
        name: "currentPlayingLevel",
        options: playingLevelOptions,
      },
      { type: "height", label: "Height (cm)", name: "height" },
      { type: "weight", label: "Weight (kg/lbs)", name: "weight" },

      {
        title: "Physical Stats",
        name: "physicalStats",
        fields: [
          {
            type: "slider",
            min: 0,
            max: 100,
            step: 1,
            label: "Speed",
            name: "speed",
            options: [
              { label: "50%", value: "50%" },
              { label: "80%", value: "80%" },
              { label: "100%", value: "100%" },
            ],
          },
          {
            type: "slider",
            min: 0,
            max: 100,
            step: 1,
            label: "Strength",
            name: "strength",
            options: [
              { label: "50%", value: "50%" },
              { label: "80%", value: "80%" },
              { label: "100%", value: "100%" },
            ],
          },
          {
            type: "slider",
            min: 0,
            max: 100,
            step: 1,
            label: "Endurance",
            name: "endurance",
            options: [
              { label: "50%", value: "50%" },
              { label: "80%", value: "80%" },
              { label: "100%", value: "100%" },
            ],
          },
          {
            type: "slider",
            min: 0,
            max: 100,
            step: 1,
            label: "Agility",
            name: "agility",
            options: [
              { label: "50%", value: "50%" },
              { label: "80%", value: "80%" },
              { label: "100%", value: "100%" },
            ],
          },
        ],
      },

     {
  title: "Skill & Strength",
  name: "skill",
  fields: [
    { 
      title: "Core Strength",  
      name: "coreStrengthSection",
      fields: [ 
        { type: "coreSkill", label: "Pick or Select your top core strength", name: "coreStrength" }
      ]
    },
{ 
      title: "Technical Skills",  
      name: "technicalSkillsSection",
      fields: [ 
        { type: "technicalSkill", label: "Pick or Select your top Technical Skill", name: "technicalSkills" }
      ]
    },    { 
      title: "Area for Improvements",  
      name: "improvementSection",
      fields: [ 
        { type: "technicalSkill", label: "Pick or Select your top Areas for Improvement", name: "improvement" }
      ]
    },
    {
      type: "select",
      label: "Player Fitness",
      name: "fitness",
      options: [
        { label: "Active", value: "Active" },
        { label: "Injured", value: "Injured" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ],
},
    ],
  },

  {
    id: "scout-focus",
    title: "Scouting Focus",
    icon: <IoMdContact size={28} color="teal" />,
    role: "Scout",
    fields: [
      {
      type: "select",
      label: "Sport",
      name: "scoutingSport",
      // FIXED: full SPORTS enum, "Soccer" removed (invalid value).
      options: sportOptions,
    },
    { type: "scoutPosition", label: "Position", name: "scoutingPosition", options: [] },
      // ADDED: Scout.scoutingLevel — already whitelisted on the backend,
      // previously had no UI at all.
      {
        type: "select",
        label: "Scouting Level",
        name: "scoutingLevel",
        options: scoutingLevelOptions,
      },
      {
        type: "select",
        label: "Preferred Gender",
        name: "preferredGender",
        // FIXED: was missing "Prefer not to say" from the shared GENDERS enum.
        options: genderOptions,
      },
      {
        type: "select",
        label: "Age Range",
        name: "ageRange",
        options: [
          { label: "Under 11", value: "Under 11" },
          { label: "Under 13", value: "Under 13" },
          { label: "Under 15", value: "Under 15" },
          { label: "Under 17", value: "Under 17" },
          { label: "Under 20", value: "Under 20" },
          { label: "Under 23", value: "Under 23" },
        ],
      },
      {
        type: "select",
        label: "Level of Experience",
        name: "experienceLevel",
        options: [
          { label: "Amateur", value: "Amateur" },
          { label: "Intermediate", value: "Intermediate" },
          { label: "Professional", value: "Professional" },
        ],
      },

      
    ],
  },

  {
    id: "scout-engagement",
    title: "Engagement",
    icon: <IoMdContact size={28} color="teal" />,
    role: "Scout",
    fields: [
      {
        type: "checkbox",
        label: "Engagement Options",
        name: "engagementOptions",
        options: [
          {
            label: "Collaborate with SCAH",
            description: "Participate in events organized by SCAH to support the community.",
            value: "Collaborate with SCAH",
          },
          {
            label: "Recommendations",
            description: "Open to receiving athlete recommendations from other users.",
            value: "Recommendations",
          },
          {
            label: "Event Showcase",
            description: "Showcase your club or event with a banner on your profile.",
            value: "Event Showcase",
          },
        ],
      },
     
    ],
  },


  {
    id: "experience",
    title: "Experience",
    icon: <GrNotes size={24} color="teal" />,
    fields: [
      // ---- Athlete-only ----
      { type: "text", label: "Club/Academy", name: "expClubName", userType: "athlete" },
      {
        type: "select",
        label: "Sport",
        name: "expSport",
        userType: "athlete",
        options: sportOptions,
      },
      { type: "select", label: "Position", name: "expPosition", userType: "athlete", options: [] },
      {
        type: "checkbox",
        name: "expCurrent",
        userType: "athlete",
        options: [{ label: "Currently playing here", value: "current" }],
      },
      {
        type: "textarea",
        label: "Description (optional)",
        name: "expDescription",
        userType: "athlete",
      },

      // ---- Scout-only ----
      { type: "text", label: "Organization/Club", name: "expOrganization", userType: "scout" },
      { type: "text", label: "Role/Position", name: "expRolePosition", userType: "scout" },
      {
        type: "number",
        label: "Years of Experience",
        name: "expYearsOfExperience",
        userType: "scout",
      },
      { type: "text", label: "Location", name: "expLocation", userType: "scout" },
      {
        type: "textarea",
        label: "Notable Talents Discovered",
        name: "expNotableTalents",
        userType: "scout",
      },

      // ---- Shared by both (startDate/endDate exist on both sub-schemas) ----
      { type: "date", label: "Start Date", name: "expStart" },
      { type: "date", label: "End Date", name: "expEnd" },
    ],
  },

  {
    id: "additional",
    title: "Additional Information",
    icon: <FaRegStar size={24} color="teal" />,
    role: "athlete",
    fields: [
      { type: "text", label: "Role Model", name: "model" },

      {
        title: "Coach / Teammates Endorsement Reference",
        name: "endorsement",
        fields: [
          { type: "email", label: "Email", name: "endorsementEmail" },
          { type: "text", label: "LinkedIn", name: "endorsementLinkedin" },
        ],
      },

      {
        title: "Goals & Aspirations",
        name: "goals",
        fields: [
          { type: "textarea", label: "Short term goals", name: "short" },
          { type: "textarea", label: "Long term goals", name: "long" },
          {
            type: "checkbox",
            label: "Preferred Career Path",
            name: "career",
            options: [
              { label: "Scholarships", value: "Scholarships" },
              { label: "Professional trials", value: "Professional trials" },
              { label: "Club/Academy Signing", value: "Club/Academy Signing" },
            ],
          },

          {
            type: "select",
            label: "Open to relocate",
            name: "relocate",
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
              { label: "Maybe", value: "Maybe" },
            ],
          },
        ],
      },
      {
    title: "Media and Verification",
    name: "media",
    userType: "athlete",
    fields: [
      { type: "file", label: "Upload action photo/videos", name: "media" },
      { type: "file", label: "Endorse video (Coach/teammate)", name: "endorseVideo" },
      { type: "file", label: "Official document upload", name: "officialDocument" },
    ],
  },

    ],
  },
  
];