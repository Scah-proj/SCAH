import { User, Shield, SquareMinus, Bookmark, History, Bell, Star, BellOff, LockKeyhole, CircleStar,
MessageSquare, AtSign, Smartphone,ArrowDownToLine, PersonStanding, Languages, Signal,
 } from "lucide-react";

export const activityRoutes = [
  {
    title: "Interactions",
    items: [
      { label: "Likes", path: "/userfeed/settings/account/details" , icon: <User size={20} />},
      { label: "Comments", path: "/userfeed/settings/account/security" , icon: <Shield size={20} />},
      { label: "Reposts", path: "/userfeed/settings/account/ad-preferences" , icon: <SquareMinus size={20} />},
      { label: "Tags", path: "/userfeed/settings/account/ad-preferences" , icon: <SquareMinus size={20} />},
      { label: "Reviews", path: "/userfeed/settings/account/ad-preferences" , icon: <SquareMinus size={20} />},
    ],
  },
  {
    title: "Removed and archived content",
    items: [
      { label: "Recently deleted", path: "/userfeed/settings" , icon: <History size={20} />},
      { label: "Archived", path: "/userfeed/settings/usage/notifications" , icon: <Bell size={20} />},
    ],
  },
  {
    title: "content you shared",
    items: [
      { label: "Posts", path: "/settings/usage/saved" , icon: <Star size={20} />},
      { label: "Reels", path: "/settings/usage/activity" , icon: <BellOff size={20} />},
      { label: "Highlights", path: "/settings/usage/activity" , icon: <BellOff size={20} />},
    ],
  },
  {
    title: "Suggested Content",
    items: [
      { label: "Not interested", path: "/settings/usage/saved" , icon: <LockKeyhole size={20} />},
      { label: "Interested", path: "/settings/usage/activity" , icon: <CircleStar size={20} />},
    ],
  },
  {
    title: "How you use Scah",
    items: [
      { label: "Time Spent", path: "/settings/usage/saved" , icon: <MessageSquare size={20} />},
      { label: "Watch history", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
      { label: "Account history", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
      { label: "Recent Searches", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
      { label: "Link history", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
    ],
  },
 
 
];