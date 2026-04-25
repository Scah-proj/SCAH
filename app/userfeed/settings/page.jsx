"use client"
import { settingsSections } from "./navroutes";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SearchSettings from "../../components/Search/SearchSettings"
import Image from "next/image";
import { usePathname } from "next/navigation";

const Page = () => {
    return(
        <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
             <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Settings
            </h1>
            </div>
            <div className="px-4 space-y-6">
            {/* searchbar */}
             <div className="">
                          <SearchSettings
                       />
                        </div>
            <div className="space-y-4">
                {settingsSections.map((section) => (
  <div key={section.title}>
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
      {section.title}
    </h2>

    <div className="bg-white rounded-xl border">
      {section.items.map((item) => (
        <div key={item.path}>
        <Link key={item.path} href={item.path} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md">
          <div className="flex items-center gap-2"><span className="font-medium text-gray-500">{item.icon}</span><span className="font-semibold">{item.label}</span></div>
          <span className="text-gray-400"><ChevronRight size={18} /></span>
        </Link>
        </div>
      ))}
      
     <div className="px-3 py-2 flex items-center justify-center">
        <Link href="/userfeed/settings/account" className="text-sm text-gray-800">
        <p>{section.more}</p>
        </Link>
      </div>
    </div>
  </div>
))}
            </div>
            <div className="font-semibold">
                <p className="text-teal-700">Add account</p>
                <p className="text-red-700">Log out</p>
            </div>
            </div>
        </div>
    )
}
export default Page;