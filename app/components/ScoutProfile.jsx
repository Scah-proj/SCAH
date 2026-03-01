import Image from 'next/image';


export default function ScoutProfile({ profile }) {
    return (
        <div className="flex justify-between items-center py-4 rounded-lg">
            <div className="flex items-center space-x-3">
                       <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
                         <Image
                           src={profile?.photo || "/wen.webp"}
                           alt={profile?.author || "Author"}
                           width={48}
                           height={48}
                           className="object-cover"
                         />
                       </div>
                       <div>
                         <h3 className="font-semibold text-sm text-gray-900">{profile?.author || "Unknown Author"}</h3>
                         <p className="text-xs text-gray-600">{profile?.club || "Member"}</p>
                       </div>
                     </div>
            <div>
                <div className="border border-gray-300 px-3 py-1 flex items-center justify-center rounded-sm text-teal-600 text-xs font-semibold cursor-pointer">
                    <p>View Profile</p>
                </div>
            </div>
        </div>
    )
}