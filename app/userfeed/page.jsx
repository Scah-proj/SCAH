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
    <div className="min-h-screen bg-white">
        {/* Mobile header with centered logo */}
        <div className="lg:hidden flex justify-center items-center p-4 bg-white relative">
            <Link href="/feed">
                <Image
                    src="/yattr.png"
                    alt="SCAH Logo"
                    width={80}
                    height={30}
                    priority
                    className="object-contain"
                />
            </Link>
            <div className="absolute right-4 flex items-center gap-3">
                <BellPlus 
                  size={28}
                  className="text-gray-500"
               />
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
                  <Link href="/profile">
                        <Image
                            src="/wen.webp"
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                        </Link>
                </div>
            </div>
        </div>
        

        {/* Main content */}
        <div className="p-4">
            <FeedComponent />
        </div>
    </div>
 )   
}
export default Page;