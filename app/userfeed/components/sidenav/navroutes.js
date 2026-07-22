import {HomeIcon, MessageCircle, UsersIcon, CircleMinus, Search, BellPlus,ListTodo, Settings} from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";

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
        label: "",
        path: "",
        icon: <CircleMinus color="white"/>,
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