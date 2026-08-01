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
  
  
 
];