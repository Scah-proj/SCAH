
const TRYOUTS = [
  {
    id: 1,
    title: "U17 Football Scouting Camp – Abuja",
    sport: "Football",
    level: "Academy",
    gender: "Male",

    date: "July 05, 2025",
    time: "8:30 AM",
    city: "Abuja, Nigeria",
    venue: "FIFA Goal Project Pitch",

    organizer: "Capital City Youth Academy",
    contactEmail: "info@ccya.ng",

    eligibility: {
      ageRange: "15–17",
      positions: ["RB", "LB", "CM"],
    },

    fee: {
      type: "Paid",
      amount: "₦5,000",
    },

    opportunities: ["Scholarship", "Scout Evaluation"],

    requirements: ["SCAH Profile", "Highlight Video"],

    visibility: "Public",
    deadline: "June 28, 2025",

    description:
      "A scouting-focused tryout aimed at identifying technically gifted players for local and international academy placements.",
      scout: {
    "id": "scout_1",
    "name": "Elite Football Academy",
    "profileImage": "...",
    "verified": true
  }
  },

  {
    id: 2,
    title: "Women’s Pro Football Trial – Ibadan",
    sport: "Football",
    level: "Pro",
    gender: "Female",

    date: "August 10, 2025",
    time: "10:00 AM",
    city: "Ibadan, Nigeria",
    venue: "Lekki United Training Centre",

    organizer: "Rising Queens FC",
    contactEmail: "trials@risingqueensfc.com",

    eligibility: {
      ageRange: "18–25",
      positions: ["ST", "LW", "RW"],
    },

    fee: {
      type: "Free",
      amount: null,
    },

    opportunities: ["Contract", "Scout Evaluation"],

    requirements: ["Highlight Video", "ID / Passport"],

    visibility: "Public",
    deadline: "August 01, 2025",

    description:
      "Professional women’s football trial for attackers ahead of the new league season.",
      scout: {
    "id": "scout_2",
    "name": "Rising Queens FC",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 3,
    title: "U20 Basketball Open Tryouts – Lagos",
    sport: "Basketball",
    level: "Semi-Pro",
    gender: "Male",

    date: "June 20, 2025",
    time: "11:00 AM",
    city: "Lagos, Nigeria",
    venue: "National Stadium Indoor Hall",

    organizer: "Hoops Africa Initiative",
    contactEmail: "hello@hoopsafrica.org",

    eligibility: {
      ageRange: "17–20",
      positions: ["PG", "SG", "SF"],
    },

    fee: {
      type: "Paid",
      amount: "₦3,000",
    },

    opportunities: ["Trial", "Scholarship"],

    requirements: ["SCAH Profile", "ID / Passport"],

    visibility: "Public",
    deadline: "June 15, 2025",

    description:
      "An open basketball tryout focused on identifying young talent for regional semi-pro teams.",
      scout: {
    "id": "scout_3",
    "name": "Hoops Africa Initiative",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 4,
    title: "Elite Tennis Development Tryout – Accra",
    sport: "Tennis",
    level: "Scholarship",
    gender: "Co-ed",

    date: "September 02, 2025",
    time: "7:30 AM",
    city: "Accra, Ghana",
    venue: "Accra Sports Club",

    organizer: "West Africa Tennis Foundation",
    contactEmail: "apply@watf.org",

    eligibility: {
      ageRange: "14–18",
      positions: ["Singles", "Doubles"],
    },

    fee: {
      type: "Paid",
      amount: "$20",
    },

    opportunities: ["Scholarship"],

    requirements: ["Highlight Video", "ID / Passport"],

    visibility: "Public",
    deadline: "August 25, 2025",

    description:
      "Scholarship-based tennis tryout for junior players seeking international training opportunities.",
      scout: {
    "id": "scout_4",
    "name": "West Africa Tennis Foundation",
    "profileImage": "...",
    "verified": true,
      }
  },

  {
    id: 5,
    title: "U23 Football Combine – Port Harcourt",
    sport: "Football",
    level: "Semi-Pro",
    gender: "Male",

    date: "July 18, 2025",
    time: "9:00 AM",
    city: "Port Harcourt, Nigeria",
    venue: "Liberation Stadium",

    organizer: "South South Talent Hub",
    contactEmail: "combine@southsouthhub.ng",

    eligibility: {
      ageRange: "19–23",
      positions: ["CB", "CDM", "GK"],
    },

    fee: {
      type: "Paid",
      amount: "₦7,000",
    },

    opportunities: ["Trial", "Scout Evaluation"],

    requirements: ["SCAH Profile", "Highlight Video", "ID / Passport"],

    visibility: "Public",
    deadline: "July 10, 2025",

    description:
      "A competitive football combine designed to expose unsigned players to semi-pro club scouts.",
      scout: {
    "id": "scout_5",
    "name": "South South Talent Hub",
    "profileImage": "...",
    "verified": true,
      }
  },

  // 🔥 ADDITIONAL 5 UNIQUE TRYOUTS

  {
    id: 6,
    title: "U15 Grassroots Football Camp – Abeokuta",
    sport: "Football",
    level: "Academy",
    gender: "Male",

    date: "June 15, 2025",
    time: "8:00 AM",
    city: "Abeokuta, Nigeria",
    venue: "MKH Sports Field",

    organizer: "Future Stars Academy",
    contactEmail: "futurestars@gmail.com",

    eligibility: {
      ageRange: "13–15",
      positions: ["All Positions"],
    },

    fee: {
      type: "Free",
      amount: null,
    },

    opportunities: ["Scholarship"],

    requirements: ["ID / Passport"],

    visibility: "Public",
    deadline: "June 10, 2025",

    description:
      "Grassroots development camp focused on identifying young football talents for long-term academy training.",
      scout: {
    "id": "scout_6",
    "name": "Future Stars Academy",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 7,
    title: "Women’s Basketball Tryout – Benin City",
    sport: "Basketball",
    level: "Academy",
    gender: "Female",

    date: "July 25, 2025",
    time: "12:00 PM",
    city: "Benin City, Nigeria",
    venue: "Ogbe Stadium Court",

    organizer: "Queens Hoops Program",
    contactEmail: "queenshoops@ngo.org",

    eligibility: {
      ageRange: "16–20",
      positions: ["PF", "C"],
    },

    fee: {
      type: "Free",
      amount: null,
    },

    opportunities: ["Scholarship", "Trial"],

    requirements: ["SCAH Profile"],

    visibility: "Public",
    deadline: "July 18, 2025",

    description:
      "Basketball tryout aimed at developing young female athletes for collegiate-level competition.",
      scout: {
    "id": "scout_7",
    "name": "Queens Hoops Program",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 8,
    title: "International Football Trial – Dakar",
    sport: "Football",
    level: "Pro",
    gender: "Male",

    date: "September 14, 2025",
    time: "9:30 AM",
    city: "Dakar, Senegal",
    venue: "Stade Léopold Sédar Senghor",

    organizer: "Pan-African Scouting Network",
    contactEmail: "trials@pascout.africa",

    eligibility: {
      ageRange: "18–26",
      positions: ["ST", "CAM", "RW"],
    },

    fee: {
      type: "Paid",
      amount: "$30",
    },

    opportunities: ["Contract", "Scout Evaluation"],

    requirements: ["Highlight Video", "ID / Passport"],

    visibility: "Verified Athletes",
    deadline: "September 01, 2025",

    description:
      "High-level international trial connecting African talents with clubs across Europe and Asia.",
      scout: {
    "id": "scout_8",
    "name": "Pan-African Scouting Network",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 9,
    title: "Junior Tennis Open Day – Ilorin",
    sport: "Tennis",
    level: "Academy",
    gender: "Co-ed",

    date: "June 22, 2025",
    time: "7:00 AM",
    city: "Ilorin, Nigeria",
    venue: "Kwara Tennis Club",

    organizer: "Kwara Sports Council",
    contactEmail: "sports@kwara.gov.ng",

    eligibility: {
      ageRange: "12–16",
      positions: ["Singles"],
    },

    fee: {
      type: "Free",
      amount: null,
    },

    opportunities: ["Trial"],

    requirements: ["ID / Passport"],

    visibility: "Public",
    deadline: "June 18, 2025",

    description:
      "Open tennis day for juniors interested in structured coaching and academy admission.",
      scout: {
    "id": "scout_9",
    "name": "Kwara Sports Council",
    "profileImage": "...",
    "verified": true
      }
  },

  {
    id: 10,
    title: "U19 Football Scholarship Trials – Enugu",
    sport: "Football",
    level: "Scholarship",
    gender: "Male",

    date: "August 03, 2025",
    time: "9:00 AM",
    city: "Enugu, Nigeria",
    venue: "Nnamdi Azikiwe Stadium",

    organizer: "Eastern Eagles Academy",
    contactEmail: "apply@easterneagles.ng",

    eligibility: {
      ageRange: "16–19",
      positions: ["LB", "RB", "CM"],
    },

    fee: {
      type: "Paid",
      amount: "₦4,000",
    },

    opportunities: ["Scholarship", "Scout Evaluation"],

    requirements: ["SCAH Profile", "Highlight Video"],

    visibility: "Public",
    deadline: "July 27, 2025",

    description:
      "Scholarship-focused tryout offering education-linked football development opportunities.",
      scout: {
    "id": "scout_10",
    "name": "Eastern Eagles Academy",
    "profileImage": "...",
    "verified": true
      }
  },
];



export async function getTryout() {
  return(
    TRYOUTS.map(
      ({description, requirements, ...preview}) => preview
    )
  )
}

export async function getTryoutById(id) {
 return TRYOUTS.find(t => String(t.id) === String(id))

}