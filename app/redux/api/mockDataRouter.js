import postsData from "../../userfeed/data/posts.json";
import profilesData from "../../userfeed/data/profiles.json";
import { mockNotifications } from "../../userfeed/notifications/mockdata";

export const isBackendDisabled = () => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DISABLE_BACKEND === "true") {
    return true;
  }
  if (typeof process !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return true;
  }
  return false;
};

export const mockUser = {
  _id: "mock_user_1",
  id: "mock_user_1",
  email: "demo@scah.club",
  role: "Athlete",
  name: "Alex Morgan",
  firstName: "Alex",
  lastName: "Morgan",
  fullName: "Alex Morgan",
  username: "alexmorgan",
  sport: "Football",
  position: "Forward",
  club: "SCAH FC",
  bio: "Passionate athlete showcasing talent on SCAH.",
  picture: "/fan.webp",
  profilePicture: "/fan.webp",
  banner: "/banner.webp",
  followersCount: 154,
  followingCount: 92,
  postsCount: 6,
  isVerified: true,
  requiresOnboarding: false,
  onboarding: { role: "Athlete", isCompleted: true },
  athleteProfile: {
    sport: "Football",
    position: "Forward",
    club: "SCAH FC",
  },
  eligibility: {
    ageRange: "16–22",
    gender: "Any",
    positions: ["Forward", "Midfielder"],
    experience: "Semi-Pro",
  },
};

const formattedPosts = postsData.map((p, idx) => ({
  _id: String(p.id || `post_${idx + 1}`),
  id: String(p.id || `post_${idx + 1}`),
  caption: p.caption || p.title || "Scouting highlight update",
  title: p.title || p.caption || "Scouting highlight",
  tags: p.hashtags || ["#scouting", "#scah"],
  author: {
    _id: `author_${idx + 1}`,
    name: p.author || "Athlete",
    firstName: p.author ? p.author.split(" ")[0] : "Alex",
    lastName: p.author ? p.author.split(" ")[1] || "" : "Player",
    role: p.role || "Athlete",
    picture: p.image || "/fan.webp",
  },
  media: [{ url: p.image || "/fan.webp", type: "image" }],
  likesCount: 15 + idx * 4,
  commentsCount: 3 + idx,
  savesCount: 2 + idx,
  sharesCount: 1,
  isLiked: false,
  isSaved: false,
  createdAt: p.createdAt || new Date().toISOString(),
}));

const mockTryouts = [
  {
    _id: "tryout_1",
    id: 1,
    title: "U17 Football Scouting Camp – Abuja",
    sport: "Football",
    badge: "/foa.webp",
    level: "Academy",
    gender: "Male",
    date: "July 05, 2026",
    time: "8:30 AM",
    city: "Abuja, Nigeria",
    venue: "FIFA Goal Project Pitch",
    organizer: "Capital City Youth Academy",
    contactEmail: "info@ccya.ng",
    ageRange: "15–17 years",
    positions: ["RB", "LB", "CM"],
    experience: "Professional",
    fee: { type: "Paid", amount: "₦5,000" },
    opportunities: ["Scholarship", "Scout Evaluation"],
    visibility: "Public",
    deadline: "June 28, 2026",
    description: "A scouting-focused tryout aimed at identifying gifted players for academy placements.",
    scout: {
      id: "scout_1",
      name: "Elite Football Academy",
      profileImage: "/fan.webp",
      verified: true,
    },
  },
  {
    _id: "tryout_2",
    id: 2,
    title: "Women’s Pro Football Trial – Lagos",
    sport: "Football",
    badge: "/foa.webp",
    level: "Pro",
    gender: "Female",
    date: "August 10, 2026",
    time: "10:00 AM",
    city: "Lagos, Nigeria",
    venue: "Lekki Training Centre",
    organizer: "Rising Queens FC",
    contactEmail: "trials@risingqueensfc.com",
    ageRange: "17–24 years",
    positions: ["ST", "CAM", "RW"],
    experience: "Semi-Pro",
    fee: { type: "Free", amount: null },
    opportunities: ["Contract", "Scout Evaluation"],
    visibility: "Public",
    deadline: "August 01, 2026",
    description: "Professional football trial for attackers ahead of the new league season.",
    scout: {
      id: "scout_2",
      name: "Rising Queens FC",
      profileImage: "/fan.webp",
      verified: true,
    },
  },
];

export const mockLiveStreams = [
  {
    id: "stream_1",
    _id: "stream_1",
    title: "Speed & Agility Combine – Live Pitch Drills",
    sport: "Football",
    category: "Training & Drills",
    thumbnail: "/roa.webp",
    viewersCount: 142,
    startedAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
    broadcaster: {
      id: "athlete_3",
      _id: "athlete_3",
      name: "David Uchenna",
      username: "daviduchenna",
      sport: "Football",
      position: "Center Back",
      club: "Sparta Prague",
      picture: "/roa.webp",
      avatar: "/roa.webp",
      height: "188 cm",
      weight: "78 kg",
      preferredFoot: "Right",
      isVerified: true,
    },
    comments: [
      { id: "c1", userName: "Marcus Cole", role: "Fan", text: "Incredible sprint pace!", avatar: "/coa.webp" },
      { id: "c2", userName: "Chelsea Academy Scout", role: "Scout", isScout: true, text: "Great recovery speed on that second rep.", avatar: "/toa.webp" },
      { id: "c3", userName: "Leo Coach", role: "Coach", text: "Keep that hip level on the deceleration.", avatar: "/fan.webp" },
    ],
  },
  {
    id: "stream_2",
    _id: "stream_2",
    title: "Lagos Academy U19 Showcase Match – 2nd Half",
    sport: "Football",
    category: "Match Showcase",
    thumbnail: "/hudson.webp",
    viewersCount: 289,
    startedAt: new Date(Date.now() - 1000 * 60 * 52).toISOString(),
    broadcaster: {
      id: "athlete_1",
      _id: "athlete_1",
      name: "Neymar Jnr",
      username: "neymarjr",
      sport: "Football",
      position: "Left Winger",
      club: "Free Agent",
      picture: "/hudson.webp",
      avatar: "/hudson.webp",
      height: "175 cm",
      weight: "68 kg",
      preferredFoot: "Both",
      isVerified: true,
    },
    comments: [
      { id: "c4", userName: "Sarah Miller", role: "Fan", text: "What a pass!", avatar: "/coa.webp" },
      { id: "c5", userName: "Rising Queens Scout", role: "Scout", isScout: true, text: "Excellent field vision under pressure.", avatar: "/chang.webp" },
    ],
  },
  {
    id: "stream_3",
    _id: "stream_3",
    title: "Elite Basketball 3-Point & Transition Workout",
    sport: "Basketball",
    category: "Drills & Skills",
    thumbnail: "/toa.webp",
    viewersCount: 88,
    startedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    broadcaster: {
      id: "athlete_5",
      _id: "athlete_5",
      name: "Momoh Tobi",
      username: "tobihoops",
      sport: "Basketball",
      position: "Point Guard",
      club: "Barcelona Academy",
      picture: "/toa.webp",
      avatar: "/toa.webp",
      height: "192 cm",
      weight: "84 kg",
      preferredFoot: "Right",
      isVerified: true,
    },
    comments: [
      { id: "c6", userName: "Hoops Scout", role: "Scout", isScout: true, text: "Smooth release off the dribble.", avatar: "/fan.webp" },
    ],
  },
];

export const mockReplays = [
  {
    id: "replay_1",
    _id: "replay_1",
    streamId: "stream_prev_1",
    title: "Full 90-Min Trial Match: East vs West Showcase",
    sport: "Football",
    category: "Match Showcase",
    thumbnail: "/hudson.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    durationMinutes: 88,
    viewsCount: 1420,
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    broadcaster: {
      id: "athlete_1",
      _id: "athlete_1",
      name: "Neymar Jnr",
      username: "neymarjr",
      sport: "Football",
      position: "Left Winger",
      club: "Free Agent",
      picture: "/hudson.webp",
      height: "175 cm",
      weight: "68 kg",
      preferredFoot: "Both",
      isVerified: true,
    },
    metricsSummary: {
      sprintTopSpeed: "33.4 km/h",
      keyPasses: 6,
      shotsOnTarget: 4,
      scoutInvitesReceived: 3,
    },
  },
  {
    id: "replay_2",
    _id: "replay_2",
    streamId: "stream_prev_2",
    title: "Defensive Agility & 1v1 Tackling Combine",
    sport: "Football",
    category: "Drills & Skills",
    thumbnail: "/roa.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    durationMinutes: 45,
    viewsCount: 890,
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    broadcaster: {
      id: "athlete_3",
      _id: "athlete_3",
      name: "David Uchenna",
      username: "daviduchenna",
      sport: "Football",
      position: "Center Back",
      club: "Sparta Prague",
      picture: "/roa.webp",
      height: "188 cm",
      weight: "78 kg",
      preferredFoot: "Right",
      isVerified: true,
    },
    metricsSummary: {
      interceptions: 8,
      tackleSuccess: "87%",
      recoveryRuns: 12,
      scoutInvitesReceived: 2,
    },
  },
  {
    id: "replay_3",
    _id: "replay_3",
    streamId: "stream_prev_3",
    title: "Elite Basketball 3-Point & Transition Workout",
    sport: "Basketball",
    category: "Drills & Skills",
    thumbnail: "/toa.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    durationMinutes: 38,
    viewsCount: 650,
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    broadcaster: {
      id: "athlete_5",
      _id: "athlete_5",
      name: "Momoh Tobi",
      username: "tobihoops",
      sport: "Basketball",
      position: "Point Guard",
      club: "Barcelona Academy",
      picture: "/toa.webp",
      height: "192 cm",
      weight: "84 kg",
      preferredFoot: "Right",
      isVerified: true,
    },
    metricsSummary: {
      threePointPercentage: "58%",
      pullUpMidRange: "14/18",
      scoutInvitesReceived: 1,
    },
  },
];

/**
 * Resolves a mock RTK Query response for a given request.
 */
export async function resolveMockResponse(args) {
  const url = typeof args === "string" ? args : args?.url || "";
  const method = (typeof args === "object" ? args?.method : "GET")?.toUpperCase() || "GET";

  // Simulate minimal realistic network latency (30-80ms)
  await new Promise((resolve) => setTimeout(resolve, 50));

  // 1. Auth endpoints
  if (url.includes("/api/auth/login") || url.includes("/api/auth/register") || url.includes("/api/auth/google")) {
    return {
      data: {
        success: true,
        token: "mock_jwt_token_scah_offline",
        user: mockUser,
        userId: mockUser._id,
        role: mockUser.role,
      },
    };
  }

  if (url.includes("/api/auth/")) {
    return {
      data: {
        success: true,
        message: "Mock auth operation succeeded",
      },
    };
  }

  // 2. Feed endpoints
  if (url.includes("/api/feed/home") || url.includes("/api/feed/discover") || url === "/api/feed") {
    if (method === "GET") {
      return {
        data: {
          posts: formattedPosts,
          page: 1,
          totalPages: 1,
          total: formattedPosts.length,
        },
      };
    }
    // Create post / mutation
    return {
      data: {
        success: true,
        post: formattedPosts[0],
        message: "Post created (Mock Mode)",
      },
    };
  }

  if (url.includes("/api/feed/saved") || url.includes("/api/feed/reposts")) {
    return {
      data: {
        posts: formattedPosts.slice(0, 3),
      },
    };
  }

  if (url.includes("/api/feed/")) {
    return {
      data: formattedPosts[0],
    };
  }

  // 3. Profile endpoints
  if (url.includes("/api/profile")) {
    if (method === "GET") {
      return {
        data: mockUser,
      };
    }
    // Update profile mutation
    return {
      data: {
        success: true,
        user: mockUser,
        message: "Profile updated (Mock Mode)",
      },
    };
  }

  if (url.includes("/api/upload/")) {
    return {
      data: {
        success: true,
        url: "/fan.webp",
        message: "File uploaded (Mock Mode)",
      },
    };
  }

  // 4. Tryouts
  if (url.includes("/api/tryout")) {
    if (url.includes("/latest")) {
      return { data: mockTryouts[0] };
    }
    if (method === "GET") {
      return { data: mockTryouts };
    }
    return {
      data: {
        success: true,
        message: "Tryout operation succeeded (Mock Mode)",
      },
    };
  }

  // 5. Notifications
  if (url.includes("notification")) {
    return {
      data: {
        notifications: mockNotifications,
        unreadCount: mockNotifications.filter((n) => !n.read).length,
      },
    };
  }

  // 6. Connections & Mutuals
  if (url.includes("/api/connection") || url.includes("mutuals") || url.includes("followers") || url.includes("following")) {
    return {
      data: profilesData,
    };
  }

  // 7. Stories
  if (url.includes("/api/story")) {
    return {
      data: [],
    };
  }

  // 8. Recommendations
  if (url.includes("/api/recommendation")) {
    return {
      data: profilesData,
    };
  }

  // 9. Settings
  if (url.includes("/api/setting")) {
    return {
      data: {
        notifications: true,
        emailAlerts: true,
        darkMode: false,
      },
    };
  }

  // 10. Live Streaming & VOD Replays
  if (url.includes("/api/live/replays")) {
    const matchReplayId = url.match(/\/api\/live\/replays\/([^/?]+)/);
    if (matchReplayId && matchReplayId[1]) {
      const found = mockReplays.find((r) => r.id === matchReplayId[1] || r._id === matchReplayId[1]);
      return { data: found || mockReplays[0] };
    }
    return {
      data: {
        replays: mockReplays,
        total: mockReplays.length,
      },
    };
  }

  if (url.includes("/api/live")) {
    if (url.includes("/start")) {
      return {
        data: {
          success: true,
          streamId: "stream_live_active",
          message: "Live stream initialized",
        },
      };
    }
    if (url.includes("/end")) {
      return {
        data: {
          success: true,
          message: "Live stream ended",
          summary: {
            durationMinutes: 32,
            peakViewers: 215,
            reactionsCount: 1420,
            trialInvitesReceived: 2,
          },
        },
      };
    }
    if (url.includes("/react")) {
      return {
        data: {
          success: true,
        },
      };
    }
    const matchId = url.match(/\/api\/live\/([^/?]+)/);
    if (matchId && matchId[1] && matchId[1] !== "start") {
      const found = mockLiveStreams.find((s) => s.id === matchId[1] || s._id === matchId[1]);
      return { data: found || mockLiveStreams[0] };
    }
    return {
      data: {
        streams: mockLiveStreams,
        totalActive: mockLiveStreams.length,
      },
    };
  }

  // Fallback for any mutation
  if (method !== "GET") {
    return {
      data: {
        success: true,
        message: "Action succeeded (Mock Mode)",
      },
    };
  }

  // Default fallback for GET
  return {
    data: {},
  };
}
