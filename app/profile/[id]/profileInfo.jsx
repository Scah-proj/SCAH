"use client";
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect } from "react";
import { useUserStore } from "../../../lib/userStore";
import { MdEdit } from "react-icons/md";
import { Label } from "../../../components/ui/label";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
    

export default function ProfileInfo({ profile, isOwnProfile }){
    const { user } = useUserStore();
    const router = useRouter();


   
    const [bio, setBio] = useState(""); // initially empty

    const handleEdit = () => {
        router.push('/profile/editBio');
    }
    return(
        <div className="mb-6">
            <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
                <div className="relative">
                    <div className="relative">
                        <Image
                            src={user?.coverPhoto || "/rename.webp"}
                            alt="Cover Photo"
                            width={1200}
                            height={300}
                            className="w-full h-40 md:h-60 object-cover"
                        />
                        <div>
                    {isOwnProfile ? (
                          <Label className="absolute right-8 bottom-8 border bg-white rounded-full  cursor-pointer">
                            <MdEdit size={16} className="m-2"/>
                            <input type="file" name="editCover" id="editCover" className="hidden"/>
                            </Label>
                    ) : null}
                </div>
                       
                        
                    </div>
                    <Image
                        src={user?.profilePicture || "/wen.webp"}
                        alt="Profile Picture"
                        width={250}
                        height={250}
                        className="w-20 !h-20 md:w-48 md:!h-48 object-cover rounded-full absolute bottom-[-60px] left-4 border-4 border-white"
                    />
                </div>
            </div>
            <div className="px-6">

            <div className="flex flex-row justify-between mt-16">
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl text-black break-all"> {profile?.name || "Michael AE"}</p>
                    <p className="font-medium text-sm text-gray-800">{profile?.club || "Super Eagles"}</p>
                    <p className="text-xs text-gray-500">{profile?.location || "Nigeria"}</p>
                </div>
                <div>
                    {isOwnProfile ? (
                    <Link href="/profile/editProfile">
                        <button className="border rounded-full py-1 px-3 max-sm:w-full text-center hover:bg-gray-100 cursor-pointer">Edit Profile</button>
                    </Link>
                    ) : (
                        <button className="border rounded-full py-1 px-3 max-sm:w-full text-center hover:bg-gray-100 cursor-pointer">Follow</button>

                    )}
                </div>
            </div>
            <div className="py-2 flex">
                {profile?.bio ? (
                <p className="p-2 rounded-md bg-gray-100">{profile?.bio}</p>
                ) : (
                <div>
                    {isOwnProfile ? (
                         <div
                    onClick={handleEdit}
                    className="border p-2 rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                    <MdEdit size={16} />
                    <p className="font-medium">Add Bio</p>
                </div>
                    ) : null}
                </div>
                )}
            </div>
            {/* <div className="flex">
                <div className="border rounded-full p-3 mt-5 cursor-pointer">
                    <AiOutlinePlus size={24} color="gray"/>
                </div>
            </div> */}
           </div>
        </div>
    )
}