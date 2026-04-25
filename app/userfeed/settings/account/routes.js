import { User, Shield, SquareMinus, Bookmark, History, Bell, Star, BellOff, LockKeyhole, CircleStar,
MessageSquare, AtSign, Smartphone,ArrowDownToLine, PersonStanding, Languages, Signal,
 } from "lucide-react";

export const accountCenterRoutes = [
  {
    title: "Account Center",
    items: [
      { label: "Personal details",
        desc: "See your account information like your phone number and email address.",
        path: "/userfeed/settings/account/details" ,
        icon: <User size={20} /> },
      { label: "Password and security", 
        desc: "Login & recovery and security checks.",
        path: "/userfeed/settings/account/security" , 
        icon: <Shield size={20} />},
      { label: "Ad preferences", 
        desc: "Take control of your ad experience and the information used to show you ads.",
        path: "/userfeed/settings/account/ad-preferences" , 
        icon: <SquareMinus size={20} />},
      { label: "Deactivate your account", 
        desc: "Find out how you can deactivate your account.",
        path: "/userfeed/settings/account/deactivate" , 
        icon: <SquareMinus size={20} />},
    ],
  },
 
 
 
];