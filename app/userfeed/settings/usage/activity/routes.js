import { Heart, MessageCircle, SquareMinus, Repeat2, Trash2, Search, Star, LockKeyhole, Smartphone,
 } from "lucide-react";

export const activityRoutes = [
  {
    title: "Interactions",
    items: [
      // { label: "Likes", path: "/userfeed/settings/usage/likes" , icon: <Heart size={20} />},
      // { label: "Comments", path: "/userfeed/settings/usage/comments" , icon: <MessageCircle size={20} />},
      { label: "Reposts", path: "/userfeed/settings/usage/activity/reposts" , icon: <Repeat2 size={20} />},
      // { label: "Reviews", path: "/userfeed/settings/usage/reviews" , icon: <SquareMinus size={20} />},
      { label: "Favorites", path: "/userfeed/settings/usage/activity/favorites" , icon: <Star size={20} />},
      
    ],
  },
  {
    title: "Removed and archived content",
    items: [
      { label: "Recently deleted", path: "/userfeed/settings/usage/activity/deleted" , icon: <Trash2 size={20} />},
    ],
  },
  // {
  //   title: "content you shared",
  //   items: [
  //     { label: "Posts", path: "/userfeed/settings/usage/posts" , icon: <Star size={20} />},
  //   ],
  // },
  {
    title: "Suggested Content",
    items: [
      { label: "Not interested", path: "/userfeed/settings/usage/suggested" , icon: <LockKeyhole size={20} />},
    ],
  },
  {
    title: "How you use Scah",
    items: [
      // { label: "Time Spent", path: "/settings/usage/saved" , icon: <MessageSquare size={20} />},
      // { label: "Watch history", path: "/userfeed/settings/usage/history" , icon: <Smartphone size={20} />},
      // { label: "Account history", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
      // { label: "Recent Searches", path: "/userfeed/settings/usage/recent-searches" , icon: <Search size={20} />},
      // { label: "Link history", path: "/settings/usage/activity" , icon: <AtSign size={20} />},
    ],
  },
 
 
];