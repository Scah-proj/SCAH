
"use client";
import Profile from "./profile/page";
import { useUserStore } from "../../lib/userStore";


export default function Page({ params }){
   const user = useUserStore((state) => state.user);



    return(
    <div className="">

       <Profile profile={user}
      isOwnProfile={true}/>
    </div>
)
}
