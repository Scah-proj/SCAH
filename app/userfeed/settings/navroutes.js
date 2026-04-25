import { User, Shield, SquareMinus, Bookmark, History, Bell, Star, BellOff, LockKeyhole, CircleStar,
MessageSquare, AtSign, Smartphone,ArrowDownToLine, PersonStanding, Languages, Signal,
 } from "lucide-react";

export const settingsSections = [
  {
    title: "Account Center",
    items: [
      { label: "Personal details", path: "/userfeed/settings/account/details" , icon: <User size={20} />},
      { label: "Password and security", path: "/userfeed/settings/account/security" , icon: <Shield size={20} />},
      { label: "Ad preferences", path: "/userfeed/settings/account/ad-preferences" , icon: <SquareMinus size={20} />},
    ],
    more: "See more in Account Center",
  },
  {
    title: "How you use Scah",
    items: [
      { label: "Saved", path: "/userfeed/settings/usage/saved" , icon: <Bookmark size={20} />},
      { label: "Your Activity", path: "/userfeed/settings/usage/activity" , icon: <History size={20} />},
      { label: "Notifications", path: "/userfeed/settings/usage/notification" , icon: <Bell size={20} />},
    ],
    more: "",
  },
  {
    title: "What you see",
    items: [
      { label: "Favorites", path: "/userfeed/settings/usage/saved" , icon: <Star size={20} />},
      { label: "Muted accounts", path: "/userfeed/settings/usage/activity" , icon: <BellOff size={20} />},
    ],
     more: "",
  },
  {
    title: "Who can see your content",
    items: [
      { label: "Account privacy", path: "/userfeed/settings/view/privacy" , icon: <LockKeyhole size={20} />},
      { label: "Close friends", path: "/userfeed/settings/view/closeFriendList" , icon: <CircleStar size={20} />},
    ],
     more: "",
  },
  {
    title: "How others interact with you",
    items: [
      { label: "Messages and story replies", path: "/userfeed/settings/interact/messageandstories" , icon: <MessageSquare size={20} />},
      { label: "Tag and mentions", path: "/userfeed/settings/interact/tagsAndMention" , icon: <AtSign size={20} />},
    ],
     more: "",
  },
  {
    title: "Your app and media",
    items: [
      { label: "Device Permissions", path: "/userfeed/settings/appAndMedia/permissions" , icon: <Smartphone size={20} />},
      { label: "Archiving and downloading", path: "/userfeed/settings/appAndMedia/archives" , icon: <ArrowDownToLine size={20} />},
      { label: "Accessibility", path: "/userfeed/settings/appAndMedia/accessibility" , icon: <PersonStanding size={20} />},
      { label: "Language and translations", path: "/userfeed/settings/appAndMedia/lang" , icon: <Languages size={20} />},
      { label: "Media quality", path: "/userfeed/settings/appAndMedia/media" , icon: <Signal size={20} />},
    ],
     more: "",
  },
  {
    title: "Learn more about privacy on Scah",
    items: [
      { label: "Privacy center", path: "/userfeed/settings/usage/saved" , icon: <User size={20} />},
      { label: "Privacy policy", path: "/userfeed/settings/usage/activity" , icon: <User size={20} />},
      { label: "Contact us", path: "/userfeed/settings/usage/privacy" , icon: <User size={20} />},
     ],
      more: "",
  },
];