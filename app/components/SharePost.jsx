import ShareOptions from "./ShareOptions";
import MessageBox from "./MessageBox";
import FollowersProfile from "./FollowersProfile";
import { useState } from "react";
import SearchFollowing from "./Search/SearchFollowing";
import { Link, Share2 } from "lucide-react";
import { LuCircleFadingPlus } from "react-icons/lu";
import { FaWhatsapp, FaSnapchat, FaInstagram, FaFacebookF   } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaThreads } from "react-icons/fa6";

export default function SharePost({ onClose, postId }) {
    const [selectedFollowers, setSelectedFollowers ] = useState([]);
    const [message, setMessage ] = useState("");
    const hasSelection = selectedFollowers.length > 0;
    return(
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">

         <div className="
         bg-white
         sm:w-[480px] w-full
                max-h-[85vh]
               sm:rounded-xl
                overflow-y-auto
                p-4">
              
              
                {/* Header */}
                <div className="flex items-center justify-end mb-4">
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>
                {/* Search bar */}
            <div className="space-y-4">
                <SearchFollowing />
                </div>
                     {/* <input
                            type="text"
                            placeholder="Search followers..."
                            className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Search
                        </button> */}
                        {/* Following */}
                <div className="mb-4 max-h-72 overflow-y-auto no-scrollbar">
                   <FollowersProfile
                   selectedFollowers={selectedFollowers}
                   setSelectedFollowers={setSelectedFollowers}/>
                </div>

                <div>
                    {hasSelection ? (
                        <MessageBox
                        message={message}
                        setMessage={setMessage}
                        />
                    ) :
                        <div>
                            <div className="overflow-x-auto no-scrollbar px-4">
  <div className="flex items-start gap-6 w-max">
    
    <ShareOptions icon={<LuCircleFadingPlus size={18} />} label="Add to Story" />
    <ShareOptions icon={<Link size={18} />} label="Copy link" />
    <ShareOptions icon={<FaWhatsapp size={18} />} label="WhatsApp" />
    <ShareOptions icon={<Share2 size={18} />} label="Share" />
    <ShareOptions icon={<FaFacebookF size={18} />} label="Facebook" />
    <ShareOptions icon={<FaInstagram size={18} />} label="Instagram" />
    <ShareOptions icon={<RiTwitterXLine size={18} />} label="X" />
    <ShareOptions icon={<FaSnapchat size={18} />} label="Snapchat" />
    <ShareOptions icon={<FaThreads size={18} />} label="Threads" />

  </div>
</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}