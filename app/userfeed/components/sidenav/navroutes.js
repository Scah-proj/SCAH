import {HomeIcon, MessageCircle, UsersIcon, CircleMinus, Search, Settings} from "lucide-react";

export const navroutes = [
    {
        label: "Feed",
        path: "/userfeed/feed",
        icon: <HomeIcon/>,
    },
    {
        label: "Chats",
        path: "/userfeed/chats",
        icon: <MessageCircle/>,
    },
    {
        label: "Communities",
        path: "/userfeed/communities",
        icon: <UsersIcon/>,
    },
    {
        label: "Try Outs",
        path: "/userfeed/tryout",
        icon: <CircleMinus/>,
    },
    {
        label: "Explore",
        path: "/userfeed/explore",
        icon: <Search/>,
    },
    {
        label: "Settings",
        path: "/userfeed/settings",
        icon: <Settings/>,
    },
];