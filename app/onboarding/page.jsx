'use client';

import MultiStepForm from "./onboardingform";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  Trophy,
  Target,
  Zap,
  Mountain,
} from "lucide-react";
import {
  useSelectRoleMutation,
  useUpdateBasicInfoMutation,
  useUpdateLocationMutation,
  useUpdatePlayingLevelMutation,
  useUpdateScoutingLevelMutation,
  useUpdateActivityLevelMutation,
  useCompleteOnboardingMutation,
} from "../redux/api/onboardingApi";
import { updateOnboardingStatus } from "../redux/features/auth/authSlice";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectRole] = useSelectRoleMutation();
  const [updateBasicInfo] = useUpdateBasicInfoMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [updatePlayingLevel] = useUpdatePlayingLevelMutation();
  const [updateScoutingLevel] = useUpdateScoutingLevelMutation();
  const [updateActivityLevel] = useUpdateActivityLevelMutation();
  const [completeOnboarding] = useCompleteOnboardingMutation();

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
          options: []
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
          description: 'Detect via GPS or enter manually',
          icon: '',
        },
        {
          id: 'temporary-location',
          title: 'Set temporary location',
          description: 'Select a temporary training location',
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
          id: 'Local Clubs',
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
      await selectRole({
        role: selections[0]?.selection
      }).unwrap();

      await updateBasicInfo({
        gender: selections[1]?.gender,
        dateOfBirth: selections[1]?.dateOfBirth,
        sport: selections[1]?.sport,
        ...(selections[1]?.position && {
          position: selections[1]?.position
        })
      }).unwrap();

      await updateLocation({
        country: selections[2]?.country,
        state: selections[2]?.state,
        city: selections[2]?.city,
      }).unwrap();

      // Level-specific calls are guarded: Skip becomes visible as early as
      // step-3, before playing/activity/scouting level has been selected.
      // Only fire these if the user actually got that far and picked
      // something — otherwise leave them out of the chain entirely rather
      // than sending undefined and breaking the whole completion flow.
      if (selections[0]?.selection === 'Athlete') {
        if (selections[3]?.selection) {
          await updatePlayingLevel({
            currentPlayingLevel: selections[3]?.selection
          }).unwrap();
        }

        if (selections[4]?.selection) {
          await updateActivityLevel({
            activityLevel: selections[4]?.selection
          }).unwrap();
        }
      } else {
        if (selections[3]?.selection) {
          await updateScoutingLevel({
            scoutingLevel: selections[3]?.selection
          }).unwrap();
        }
      }

      await completeOnboarding().unwrap();
      console.log('Onboarding fully complete');

      dispatch(updateOnboardingStatus({
        requiresOnboarding: false,
        onboarding: { onboardingCompleted: true },
      }));

      router.push('/userfeed');
    } catch (error) {
      console.error('Error during onboarding submission:', error);
    }
  }

  // Skip runs the exact same flow as pressing Complete on the last step —
  // same mutation chain, same success behavior — just triggered early with
  // whatever selections have been filled in so far.
  const handleSkip = async (selections) => {
    console.log('Onboarding skipped by user, selections so far:', selections);
    return handleComplete(selections);
  };

  return <MultiStepForm formSteps={formSteps} onComplete={handleComplete} onSkip={handleSkip} positionsBySport={positionsBySport} />;
}