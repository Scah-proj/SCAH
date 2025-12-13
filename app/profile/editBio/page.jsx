import Link from "next/link";

export default function EditBio(){
    return(
        <div className="
  mx-auto
  w-full h-screen
  bg-white
  p-4
  md:max-w-md md:rounded-xl md:shadow-xl md:mt-10
">
    <div className="flex justify-between items-center my-8">
       <Link href="/profile">Cancel</Link>
        <div className="font-medium">Bio</div>
        <Link href="/profile">Save</Link>   
    </div>
    <div>
            <textarea
        className="w-full h-40 border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Write a short bio about yourself..."
      ></textarea>
    </div>
        </div>
    )
}