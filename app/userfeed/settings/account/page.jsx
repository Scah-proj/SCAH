"use client"
import { accountCenterRoutes } from "./routes";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MdArrowBack } from "react-icons/md";


const Page = () => {
    return(
        <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
             <div className="space-y-3">
              <Link
        href="/userfeed/settings"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Back to Settings </span>
      </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Account Center
            </h1>
            <p className="text-gray-600">
                Manage your connected experience and account settings.
            </p>
            </div>
            <div className="px-4 space-y-6">
          
            <div className="space-y-4">
                {accountCenterRoutes.map((section) => (
  <div key={section.title}>
   

    <div className="bg-white rounded-xl border">
      {section.items.map((item) => (
        <Link key={item.path} href={item.path} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md">
            
          <div className="">
            <div className="flex  gap-2">
            <span className="font-medium text-gray-500">{item.icon}</span>
            <div>
            <span className="font-semibold">{item.label}</span>
            <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            </div>
        </div>
          <span className="text-gray-400"><ChevronRight size={18} /></span>
        </Link>
      ))}
    </div>
  </div>
))}
            </div>
           
            </div>
        </div>
    )
}
export default Page;