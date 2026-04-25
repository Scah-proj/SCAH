"use client"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Page = () => {
    return(
       <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
         <Link
            href="/userfeed/settings/account/security"
                              className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                            >
                              <MdArrowBack />
                              <span className="ml-2 text-sm font-medium">Password and Security </span>
                            </Link>
        <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
          where you're logged in
        </h3>
        <p className="text-sm text-gray-500">Manage your active login sessions and view details about where you're signed in.</p>
        
       </div>
    )
}
export default Page;