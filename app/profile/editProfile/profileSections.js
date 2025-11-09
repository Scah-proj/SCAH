

export const profileSections = [
  {
    id: "basic-info",
    title: "Basic Info",
    fields: [
      { type: "text", label: "Full Name", name: "name" },
      { type: "text", label: "Position", name: "position", userType: "Scout" },
      { type: "date", label: "Date of Birth", name: "dob" },
      { type: "select", label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
      { type: "text", label: "Nationality", name: "nationality" },
      { type: "text", label: "Location", name: "location" },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    fields: [
      { type: "text", label: "Email", name: "email" },
      { type: "text", label: "Location", name: "location" },
      { type: "number", label: "Phone Number", name: "phone" },
      { type: "number", label: "ID", name: "id", userType: "Athlete" },
      { type: "text", label: "Organization", name: "organization", userType: "Scout" },
    ],
  },
 {
    id: "athletic",
    title: "Athletic Details (for Athletes)",
    role: "athlete",
    fields: [
      { type: "select", label: "Primary Sport", name: "primary-sport", options: ["Soccer", "Football", "Basketball"],},
      { type: "text", label: "Position", name: "position" },
      { type: "number", label: "Height (cm)", name: "height" },
      { type: "number", label: "Weight (kg)", name: "weight" },
      {
        title: "Physical Stats",
        fields: [
          { type: "select", label: "Speed", name: "speed", options: ["50%", "80%", "100%"] },
          { type: "select", label: "Strength", name: "strength", options: ["50%", "80%", "100%"] },
          { type: "select", label: "Endurance", name: "endurance", options: ["50%", "80%", "100%"] },
          { type: "select", label: "Agility", name: "agility", options: ["50%", "80%", "100%"] },
        ],
      },
    ],
  },
  {
    id: "scout",
    title: "Scouting Focus (for Scouts)",
    role: "Scout",
    fields: [
      { type: "select", label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
      { type: "select", label: "Age range", name: "age", options: ["12-15", "16-25", "26 & above"]  },
      { type: "select", label: "Level of Experience", name: "experience", options: ["Amateur", "Intermediate", "Professional"]  },
      { type: "text", label: "specific talent needs", name: "talent-needs"  },
    ],
  },
  {
    id: "scout",
    title: "Engagement (for Scouts)",
    role: "scout",
    fields: [
      {
        type: "checkbox",
       
        name: "gender",
        options: ["Willing to collaborate with scah hosted events",
           "Open to receiving athlete recommendations",
            "Upload club/event banner (optional)"],
      },
      
    ],
  },
];
