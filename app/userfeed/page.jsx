"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { BellPlus } from "lucide-react";
import FeedComponent from "./feed/feedComponent/page";

import { useEffect } from "react";
const Page = () => {
    const router = useRouter();
// useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         router.push('/auth/login');
//     }
// },[router]);
 return(
    <div className="min-h-screen">
        {/* Mobile header with centered logo */}
      
        

        {/* Main content */}
        <div className="">
            <FeedComponent />
        </div>
    </div>
 )   
}
export default Page;