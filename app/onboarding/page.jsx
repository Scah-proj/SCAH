'use client'

import MultiStepForm from "./onboardingform";
import { useRouter } from 'next/navigation';
import { postRequest } from "@/app/api";
import { 
  Trophy, 
  Target, 
  Zap, 
  Mountain, 
} from "lucide-react";

export const positionsBySport = {
  football: [
    { id: "offensive", title: "Offensive" },
    { id: "defensive", title: "Defensive" },
    { id: "special_team", title: "Special Team" },
    { id: "wide_receiver", title: "Wide Receiver" },
    { id: "tight_end", title: "Tight End" },
    { id: "midfielder", title: "Midfielder" },
    { id: "forward", title: "Forward" },
  ],
  basketball: [
    { id: "point_guard", title: "Point Guard" },
    { id: "shooting_guard", title: "Shooting Guard" },
    { id: "small_forward", title: "Small Forward" },
    { id: "power_forward", title: "Power Forward" },
    { id: "center", title: "Center" },
  ],
  tennis: [
    { id: "singles", title: "Singles Player" },
    { id: "doubles", title: "Doubles Player" },
  ],
};
export default function FormContainer() {
  const router = useRouter();
  const formSteps = [
  {
      id: 'step-1',
      title: 'Welcome to SCAH CLUB',
      description: 'Select your role to get personalized recommendations',
      items: [
        {
          id: 'athlete',
          title: 'Athlete',
          description: '',
          icon: Trophy,
        },
        {
          id: 'scout',
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
              {id: 'male', title: 'Male', description: '', icon: ''},
              {id: 'female', title: 'Female', description: '', icon: ''},
              
            ]
          },
          {
            id: 'Date of Birth',
            title: 'Date of Birth',
            options: [
              
            ]
          },
          {
            id: 'sports',
            title: 'Sport',
            options: [
              {id: 'soccer', title: 'Soccer', description: '', icon: Zap},
              {id: 'football', title: 'Football', description: '', icon: Zap},
              {id: 'basketball', title: 'Basketball', description: '', icon: Mountain},
              
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
            id: 'local clubs',
            title: 'Local Clubs',
            description: '',
            icon: '',
          },
          {
            id: 'school teams',
            title: 'School Teams',
            description: '',
            icon: '',
          },
          {
            id: 'academy programs',
            title: 'Academy Programs',
            description: '',
            icon: '',
          },
          {
            id: 'semi-professionals',
            title: 'Semi-Professionals',
            description: '',
            icon: '',
          },
          {
            id: 'professional',
            title: 'Professional',
            description: '',
            icon: '',
          },
          {
            id: 'just starting',
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
            id: 'active',
            title: 'Actively seeking opportunities',
            description: '',
            icon: '',
          },
          {
            id: 'open',
            title: 'Open to the right opportunities',
            description: '',
            icon: '',
          },
          {
            id: 'building',
            title: 'Building profile for futures',
            description: '',
            icon: '',
          },
          {
            id: 'networking',
            title: 'Just networking and Learning-',
            description: '',
            icon: '',
          },
          {
            id: 'not sure',
            title: 'Not sure yet',
            description: '',
            icon: '',
          },
          
        ]
      },
    ];

  

    const handleComplete = async (selections) => {
        console.log('Form completed with selections:', selections);
        
        
        const userData = {
            role: selections[0],
            sport: selections[1], 
            gender: selections[2], 
            location: selections[3], 
            playingLevel: selections[4], 
            seekingOpportunities: selections[5],
           
        };

         try{
            const data = await postRequest('https://jsonplaceholder.typicode.com/posts', {username: "testuser", password: "123456"});
            console.log(data);
              router.push('/userfeed/feed'); 
              
            } catch (error) {
              console.error('Error:', error);
            }
          };

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