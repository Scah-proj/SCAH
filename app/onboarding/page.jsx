'use client'

import MultiStepForm from "./onboardingform";
import { useRouter } from 'next/navigation';
import { postRequest } from "../api";
import { 
  Trophy, 
  Target, 
  Zap, 
  Mountain, 
} from "lucide-react";
import { useUserStore } from "../../lib/userStore";

export const positionsBySport = {
  Football: [
    { id: "offensive", title: "Offensive" },
    { id: "defensive", title: "Defensive" },
    { id: "special_team", title: "Special Team" },
    { id: "wide_receiver", title: "Wide Receiver" },
    { id: "tight_end", title: "Tight End" },
    { id: "midfielder", title: "Midfielder" },
    { id: "forward", title: "Forward" },
  ],
  Basketball: [
    { id: "point_guard", title: "Point Guard" },
    { id: "shooting_guard", title: "Shooting Guard" },
    { id: "small_forward", title: "Small Forward" },
    { id: "power_forward", title: "Power Forward" },
    { id: "center", title: "Center" },
  ],
  Soccer: [
    { id: "goalkeeper", title: "Goalkeeper" },
    { id: "defender", title: "Defender" },
    { id: "midfielder", title: "Midfielder" },
    { id: "forward", title: "Forward" },
  ],
};
export default function FormContainer() {
  const updateProfile = useUserStore((state)=> state.updateProfile);
  const router = useRouter();
  const formSteps = [
  {
      id: 'step-1',
      title: 'Welcome to SCAH CLUB',
      description: 'Select your role to get personalized recommendations',
      items: [
        {
          id: 'Athlete',
          title: 'Athlete',
          description: '',
          icon: Trophy,
        },
        {
          id: 'Scout',
          title: 'Scout',
          description: '',
          icon: Target,
        },
        
       
       
      ],
    },
    {
        id: 'step-2',
        title: 'Profile Details',
        description: '',
        items: [
          
          {
            id: 'gender',
            title: 'Gender',
            options: [
              {id: 'Male', title: 'Male', description: '', icon: ''},
              {id: 'Female', title: 'Female', description: '', icon: ''},
              
            ]
          },
          {
            id: 'dateOfBirth',
            title: 'Date of Birth',
            options: [
              
            ]
          },
          {
            id: 'sport',
            title: 'Sport',
            options: [
              {id: 'Soccer', title: 'Soccer', description: '', icon: Zap},
              {id: 'Football', title: 'Football', description: '', icon: Zap},
              {id: 'Basketball', title: 'Basketball', description: '', icon: Mountain},
              
            ]
          },
          {
            id: 'position',
            title: 'Position',
          },
        ]
      },
      {
        id: 'step-3',
        title: 'Where do you currently train',
        description: '',
        items: [
          {
            id: 'current-location',
            title: 'Use my current location',
            description: '',
            icon: '',
          },
         
        ]
      },
      {
        id: 'step-4',
        title: 'What is your current playing level',
        description: '',
        items: [
          {
            id: 'local Clubs',
            title: 'Local Clubs',
            description: '',
            icon: '',
          },
          {
            id: 'School Teams',
            title: 'School Teams',
            description: '',
            icon: '',
          },
          {
            id: 'Academy Programs',
            title: 'Academy Programs',
            description: '',
            icon: '',
          },
          {
            id: 'Semi-Professionals',
            title: 'Semi-Professionals',
            description: '',
            icon: '',
          },
          {
            id: 'Professional',
            title: 'Professional',
            description: '',
            icon: '',
          },
          {
            id: 'Just starting',
            title: 'Just Starting',
            description: '',
            icon: '',
          },
        ]
      },
      {
        id: 'step-5',
        title: 'How actively are you seeking opportunities',
        description: '',
        items: [
          {
            id: 'Actively seeking opportunities',
            title: 'Actively seeking opportunities',
            description: '',
            icon: '',
          },
          {
            id: 'Open to the right opportunities',
            title: 'Open to the right opportunities',
            description: '',
            icon: '',
          },
          {
            id: 'Building profile for futures',
            title: 'Building profile for futures',
            description: '',
            icon: '',
          },
          {
            id: 'Just networking and Learning',
            title: 'Just networking and Learning',
            description: '',
            icon: '',
          },
          {
            id: 'not sure',
            title: 'Not sure',
            description: '',
            icon: '',
          },
          
        ]
      },
    ];
  
  

  const handleComplete = async (selections) => {    
  console.log('All selections:', selections);
 
  try {
  const requests = [
    postRequest('/api/onboarding/role', { role: selections[0]?.selection }),
    postRequest('/api/onboarding/basic-info', {
      gender: selections[1]?.gender,
      dateOfBirth: selections[1]?.dateOfBirth,
      sport: selections[1]?.sport,
      ...(selections[1]?.position && { position: selections[1]?.position })
    }),
    postRequest('/api/onboarding/location', {
      country: selections[2]?.country,
      state: selections[2]?.state,
      city: selections[2]?.city,
    }),
  ];

  if (selections[0]?.selection === 'Athlete') {
    requests.push(
      postRequest('/api/onboarding/playing-level', { currentPlayingLevel: selections[3]?.selection }),
      postRequest('/api/onboarding/activity-level', { activityLevel: selections[4]?.selection })
    );
  } else {
    requests.push(
      postRequest('/api/onboarding/scouting-level', { scoutingLevel: selections[3]?.selection })
    );
  }

  await Promise.all(requests);
  await postRequest('/api/onboarding/complete');
  console.log('Onboarding fully complete');
  // const onboardingData = {
  //     role: selections[0]?.selection,
  //     gender: selections[1]?.gender,
  //     dateOfBirth: selections[1]?.dateOfBirth,
  //     sport: selections[1]?.sport,
  //     position: selections[1]?.position,
  //     country: selections[2]?.country,
  //     state: selections[2]?.state,
  //     city: selections[2]?.city,
  //     ...(selections[0]?.selection === "Athlete"
  //       ? {
  //           currentPlayingLevel: selections[3]?.selection,
  //           activityLevel: selections[4]?.selection,
  //         }
  //       : {
  //           scoutingLevel: selections[3]?.selection,
  //         }),
  //   };
  // updateProfile(onboardingData);
  router.push('/userfeed/feed');
} catch (error) {
  console.error('Error during onboarding submission:', error);
}




    }
    const handleSkip = () => {
        console.log('Onboarding skipped by user');
        
        
        const skipData = {
            skipped: true,
           
        };
        
        //keep track of skips?

        router.push('/userfeed/feed');
    };

return <MultiStepForm formSteps={formSteps} onComplete={handleComplete} onSkip={handleSkip} positionsBySport={positionsBySport} />;
  }