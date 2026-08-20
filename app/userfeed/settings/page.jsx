"use client";

import { settingsSections } from "./navroutes";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SearchSettings from "../../components/Search/SearchSettings";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "../../redux/api/authApi"; // Adjust relative import path as needed

const Page = () => {
    const router = useRouter();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            router.push("/");
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // deleteAccount();
            router.push("/");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 pb-48 space-y-8">
            <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Settings
                </h1>
            </div>
            <div className="px-4 space-y-6">
                {/* searchbar */}
                <div>
                    <SearchSettings />
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
                                        <Link 
                                            href={item.path} 
                                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-500">{item.icon}</span>
                                                <span className="font-semibold">{item.label}</span>
                                            </div>
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
                <div className="font-semibold flex flex-col space-y-4 ">
                    <p className="text-teal-700 cursor-pointer">Add account</p>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="text-red-700 text-left w-fit disabled:opacity-50"
                    >
                        {isLoading ? "Logging out..." : "Log out"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="text-red-600 hover:text-red-800 text-left text-sm w-fit"
                    >
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;