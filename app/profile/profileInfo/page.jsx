"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useUserStore } from "@/lib/userStore";
import { MdEdit } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
    

export default function ProfileInfo(){
    const user = useUserStore((state) => state.user);
 const setUser = useUserStore((state) => state.setUser)
    const router = useRouter();

    useEffect(() => {
  const currentUser = useUserStore.getState().user;
  
  // Only set fake user if store is completely empty
  if (!currentUser) {
    const fakeUser = {
      id: 8855,
      name: "John Doe",
      role: "athlete",
      email: "john@example.com",
      experienceList: [],
      coreStrength: [],
      technicalSkill: [],
    };

    console.log(fakeUser)
    setUser(fakeUser);
  }
}, []); // Run only once on mount //
    // get profile details from backend

    const handleEdit = () => {
        router.push('/profile/editBio');
    }
    return(
        <div className="mb-6">
            <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
                <div className="relative">
                    <div className="relative">
                        <Image
                            src="/rename.webp"
                            alt="Cover Photo"
                            width={1200}
                            height={300}
                            className="w-full h-40 md:h-60 object-cover"
                        />
                        <Label className="absolute right-8 bottom-8 border bg-white rounded-full  cursor-pointer">
                            <MdEdit size={16} className="m-2"/>
                            <input type="file" name="editCover" id="editCover" className="hidden"/>
                        </Label>
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
            <div className="px-6">

            <div className="flex flex-row justify-between mt-16">
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl text-black break-all"> {user?.name}</p>
                    <p className="font-medium text-sm text-gray-800">Manchester United Academy</p>
                    <p className="text-xs text-gray-500">Manchester, England</p>
                </div>
                <div>
                    <Link href="/profile/editProfile">
                        <button className="border rounded-full py-1 px-3 max-sm:w-full text-center hover:bg-gray-100 cursor-pointer">Edit Profile</button>
                    </Link>
                </div>
            </div>
            <div className="py-2 flex"> 
                <div onClick={handleEdit} className="border p-2 rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                    <MdEdit size={16}/>
                <p className="font-medium">Add Bio</p>
                </div>
            </div>
            <div className="flex">
                <div className="border rounded-full p-3 mt-5 cursor-pointer">
                    <AiOutlinePlus size={24} color="gray"/>
                </div>
            </div>
           </div>
        </div>
    )
}