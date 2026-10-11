import {HomeIcon, MessageCircle, Search, BellPlus, ListTodo, Settings} from "lucide-react";

export const navroutes = [
    {
        label: "Feed",
        path: "/userfeed",
        icon: <HomeIcon/>,
    },
    {
        label: "Explore",
        path: "/userfeed/explore",
        icon: <Search/>,
    },
    {
        label: "Chat",
        path: "/userfeed/chat",
        icon: <MessageCircle/>,
    },
    {
        label: "Tryouts",
        path: "/userfeed/tryout",
        icon: <ListTodo/>,
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

export const mobileroutes = [
    {
        label: "Feed",
        path: "/userfeed",
        icon: <HomeIcon/>,
    },
    
    
    {
        label: "Explore",
        path: "/userfeed/explore",
        icon: <Search/>,
    },
    {
        label: "Chat",
        path: "/userfeed/chat",
        icon: <MessageCircle/>,
    },
    {
        label: "Try Outs",
        path: "/userfeed/tryout",
        icon: <ListTodo/>,
    },
    
    {
        label: "Settings",
        path: "/userfeed/settings",
        icon: <Settings/>,
    },
];