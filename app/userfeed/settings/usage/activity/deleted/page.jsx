"use client"

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Page = () => {
    return(
        <div className="space-y-10 max-w-3xl px-4 md:px-6 py-12 mx-auto">
             <div className="space-y-3">
                <Link
                        href="/userfeed/settings/usage/activity"
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                      >
                        <MdArrowBack />
                        <span className="ml-2 text-sm font-medium">Activity </span>
                      </Link>
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
                Recently Deleted
            </h1>
            </div>
            <div className="px-4 space-y-6">
        

            <div className="space-y-4">
                <p>No recently deleted items</p>

            </div>
           
            </div>
        </div>
    )
}
export default Page;