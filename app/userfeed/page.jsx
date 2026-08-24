"use client"
import { useRouter } from "next/navigation";
import FeedComponent from "./feed/feedComponent/page";

const Page = () => {
    const router = useRouter();
    

 return(
    <div className="min-h-screen">
        {/* Main content */}
        <div className="">
            <FeedComponent />
        </div>
    </div>
 )   
}
export default Page;