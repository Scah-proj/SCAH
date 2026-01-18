import {HomeIcon, MessageCircle, UsersIcon, CircleMinus, Search, BellPlus, Settings} from "lucide-react";

export const navroutes = [
    {
        label: "Feed",
        path: "/userfeed",
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
        label: "Notifications",
        path: "/userfeed/notifications",
        icon: <BellPlus/>,
    },
    {
        label: "Settings",
        path: "/userfeed/settings",
        icon: <Settings/>,
    },
];