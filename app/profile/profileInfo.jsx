"use client";
import Image from "next/image";
import Link from "next/link";
import {useState } from "react";
import { MdEdit } from "react-icons/md";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";
import { uploadProfilePicture } from "../api";
import { useUserStore } from "../../lib/userStore";

export default function ProfileInfo({ profile, isOwnProfile }){
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    

   
    const [bio, setBio] = useState(""); // initially empty

    const handleProfilePicUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const token = localStorage.getItem("token");
    console.log("FILE:", file);
    console.log("Token:", token);
    console.log("Current store user:", useUserStore.getState().user);
    
    const res = await uploadProfilePicture(file, token);
    console.log("Upload response:", res);
    const updatedUser = res.data;

    setUser(updatedUser);

  } catch (err) {
    console.error("Profile picture upload failed", err);
  }
};
// const handleCoverUpload = async (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//  try{
    
//      const token = localStorage.getItem("token");
    
//     const res = await uploadCoverPhoto(file, token);
    
//      const updatedUser = res.data;
    
//        setUser(updatedUser);
 

//   } catch (err) {
//     console.error("Cover picture upload failed", err);
//   }
// };

    const handleEdit = () => {
        router.push('/profile/editBio');
    }
    return(
        <div className="mb-6">
            <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
                <div className="relative">
                    <div className="relative">
                        <Image
                            src={profile?.coverPhoto || "/defaultCover.jpg"}
                            alt="Cover Photo"
                            width={1200}
                            height={300}
                            className="w-full h-40 md:h-60 object-cover"
                        />
                        {/* <div>
                    {isOwnProfile ? (
                          <Label className="absolute right-8 bottom-8 border bg-white rounded-full  cursor-pointer">
                            <MdEdit size={16} className="m-2"/>
                            <input
  type="file"
  name="editCover"
  id="editCover"
  className="hidden"
  onChange={handleCoverUpload}
/>
                            </Label>
                    ) : null}
                </div> */}
                       
                        
                    </div>
                    <div className="relative">
                    <Image
                        src={profile?.profilePicture || "/defaultImage.jpg"}
                        alt="Profile Picture"
                        width={250}
                        height={250}
                        className="w-20 !h-20 md:w-48 md:!h-48 object-cover rounded-full absolute bottom-[-60px] left-4 border-4 border-white"
                    />
                    <div>
                    {isOwnProfile ? (
                          <Label className="absolute left-[12%] bottom-24 border bg-white rounded-full  cursor-pointer">
                            <MdEdit size={16} className="m-2"/>
                            <input
  type="file"
  name="editProfilePic"
  id="editProfilePic"
  className="hidden"
  onChange={handleProfilePicUpload}
/>
                            </Label>
                    ) : null}
                </div>
                    </div>
                </div>
            </div>
            <div className="px-6">

            <div className="flex flex-row justify-between mt-16">
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl text-black break-all"> {profile?.name}</p>
                    <p className="font-medium text-sm text-gray-800">{profile?.club}</p>
                    <p className="text-xs text-gray-500">{profile?.location?.state }, {profile?.location?.country}</p>
                </div>
                <div>
                    {isOwnProfile ? (
                    <Link href={`/profile/editProfile`}>
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
            
           </div>
        </div>
    )
}