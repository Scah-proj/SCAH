"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/lib/userStore";

export default function ProfileInfo(){
    const user = useUserStore((state) => state.user);
    return(
        <div className="mb-6">
            <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
                <div className="relative">
                    <div>
                        <Image
                            src="/rename.webp"
                            alt="Cover Photo"
                            width={1200}
                            height={300}
                            className="w-full h-40 md:h-60 object-cover"
                        />
                    </div>
                    <Image
                        src="/wen.webp"
                        alt="Profile Picture"
                        width={250}
                        height={250}
                        className="w-20 !h-20 md:w-48 md:!h-48 object-cover rounded-full absolute bottom-[-60px] left-4 border-4 border-white"
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-16 mx-4">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-2xl text-black break-all"> {user?.name}</p>
                    <p className="text-xs text-gray-600">Manchester United Academy</p>
                    <p className="text-xs text-gray-600">Manchester, England</p>
                </div>
                <div>
                    <Link href="/profile/editProfile">
                        <button className="border rounded-full py-1 px-3 max-sm:w-full text-center hover:bg-gray-100 cursor-pointer">Edit Profile</button>
                    </Link>
                </div>
            </div>
            <div className="px-4 py-2"> 
                <p className="font-medium">About</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    )
}