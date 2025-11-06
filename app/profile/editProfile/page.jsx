import { MdClose, MdOutlineCheck } from "react-icons/md";
import Image from "next/image";

export default function EditProfile() {
    return(
         <div className="bg-white w-full sm:w-1/2 sm:h-4/5 sm:rounded-md p-3">
        <form onSubmit=''>
          <div className="flex justify-between">
            <div
              onClick=''
              className="cursor-pointer"
            >
              <MdClose className="w-6 h-6" />  
              {/* back icon  */}
            </div>
            <p className="font-medium">Edit Profile</p>
            <button type="submit" disabled=''>
              {/* {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <MdOutlineCheck className="text-blue-500 w-6 h-6" />
              )} */}
            </button>
          </div>
          <div className="flex items-center justify-center flex-col gap-3 mt-8">
            <label
              htmlFor="profilePicture"
              className="text-blue-500 font-medium cursor-pointer"
            >
              <Image
                src='/wen.webp'
                width={180}
                height={180}
                alt=''
                className="w-24 !h-24 rounded-full object-cover"
              />
              Edit picture
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange=''
                className="hidden"
              />
            </label>

                <div className="flex w-full">
                    <label className="relative pt-4" htmlFor="name">
                      <span className="absolute top-0 left-0 text-slate-500">Name</span>
                    </label>
                    <input
                      className="border-0 border-b border-gray-400 focus:ring-0 px-0"
                      type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value=''
                onChange=''
              />
                </div>
            <label className="w-full relative pt-4" htmlFor="username">
              <span className="absolute top-0 left-0 text-slate-500">
                Username
              </span>
              <input
                className="w-full border-0 border-b border-gray-400 focus:ring-0 px-0"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value=''
                onChange=''
              />
            </label>
            <label className="w-full relative pt-4" htmlFor="bio">
              <span className="absolute top-0 left-0 text-slate-500">Bio</span>
              <input
                className="w-full border-0 border-b border-gray-400 focus:ring-0 px-0"
                type="text"
                name="bio"
                id="bio"
                placeholder="bio"
                value=''
                onChange=''
              />
            </label>
          </div>
        </form>
      </div>
    )
}