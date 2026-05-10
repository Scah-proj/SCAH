"use client"
import Link from "next/link";
import { Button } from "../../../../../../components/ui/button"
import { MdArrowBack } from "react-icons/md";


const Page = () => {
    return(
       <div className="space-y-10 max-w-2xl px-4 md:px-6 py-12 mx-auto">
         <Link
            href="/userfeed/settings/account/security"
                              className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                            >
                              <MdArrowBack />
                              <span className="ml-2 text-sm font-medium">Password and Security </span>
                            </Link>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
          Change Password
        </h3>
        <p className="text-sm text-gray-500 mb-3">Password must be at least 8 characters in length including uppercase and lowercase, a number(S) and special characters.</p>
        <div className="flex flex-col gap-4">
          <input 
          type="password"
          placeholder="Current Password"
          name="currentPassword" 
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"/> 
          <input 
          type="password"
          placeholder="New Password"
          name="newPassword" 
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"/>
          <input 
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword" 
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"/>

         <Button type="submit" className="w-full bg-teal-600">
          Change Password
        </Button> 
        </div>
        <Link href="/settings/account" className="text-sm text-teal-500">
          Forgotten your password?
        </Link>
       </div>
    )
}
export default Page;