"use client"
import Image from 'next/image';
import { Heart, MessageCircle} from "lucide-react";

export default function PostCard({ post }) {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            
                <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    {/* Header section with profile and status */}
                    <div className="flex items-center justify-between p-4">
                        {/* Left side - Profile info */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border flex items-center justify-center">
                                <Image
                                    src="/wen.webp"
                                    alt={post.author}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                <p className="text-sm text-gray-500">{post.role}</p>
                            </div>
                        </div>
                        
                        {/* Right side - Status */}
                        <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-500">
                                {post.status}
                            </span>
                        </div>
                    </div>

                    <div className="px-4 py-2">
                        <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                    </div>

                    {/* Post image */}
                    <div className="w-full">
                        <Image
                            src={post.image}
                            alt="Post Image "
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    {/* Caption and hashtags */}
                    <div className="p-4 space-y-3">
                        
                        
                        <div className="flex flex-wrap gap-2">
                            {post.hashtags.map((hashtag, index) => (
                                <span key={index} className="text-teal-600 text-sm font-medium">
                                    {hashtag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Interaction buttons */}
                    <div className="flex items-center border-t border-gray-100 ">
                            <Heart size={24} className="text-gray-600 hover:text-blue-600 cursor-pointer mx-4 mb-4" />
                            <MessageCircle size={24} className="text-gray-600 hover:text-blue-600 cursor-pointer mx-4 mb-4" />
                    </div>
                </div>
        
        </div>
    );
};
