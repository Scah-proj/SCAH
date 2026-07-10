"use client";

import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MapPin,
} from "lucide-react";

export default function SinglePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Back */}
        <Link
          href="/userfeed"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6"
        >
          <MdArrowBack size={22} />
          <span>Back to Feed</span>
        </Link>

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Image */}
          <div className="relative w-full h-[500px] bg-gray-100">
            <Image
              src="/placeholder.jpg"
              alt="Post"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 space-y-8">

            {/* Author */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src="/default-avatar.png"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-lg">
                    John Doe
                  </h2>

                  <p className="text-sm text-gray-500">
                    Scout
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                2 hours ago
              </div>

            </div>

            {/* Caption */}

            <div className="space-y-4">

              <p className="text-gray-800 leading-7 text-[15px]">
                Looking for talented midfielders with strong vision,
                passing accuracy and excellent work rate.
                If you're interested, submit your highlights.
              </p>

              <div className="flex flex-wrap gap-2">

                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  #Football
                </span>

                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  #Academy
                </span>

                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  #Scout
                </span>

              </div>

            </div>

            {/* Details */}

            <div className="grid md:grid-cols-3 gap-4">

              <div className="border rounded-xl p-4">
                <p className="text-xs uppercase text-gray-500">
                  Sport
                </p>

                <p className="font-semibold mt-1">
                  Football
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-xs uppercase text-gray-500">
                  Position
                </p>

                <p className="font-semibold mt-1">
                  Midfielder
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-xs uppercase text-gray-500 flex items-center gap-2">
                  <MapPin size={15} />
                  Location
                </p>

                <p className="font-semibold mt-1">
                  Lagos, Nigeria
                </p>
              </div>

            </div>

            {/* Stats */}

            <div className="flex items-center gap-8 border-y py-5">

              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6" />
                <span className="font-medium">
                  342 Likes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">
                  48 Comments
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Bookmark className="w-6 h-6" />
                <span className="font-medium">
                  92 Saves
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Share2 className="w-6 h-6" />
                <span className="font-medium">
                  Share
                </span>
              </div>

            </div>

            {/* Add Comment */}

            <div className="space-y-3">

              <h3 className="font-semibold text-lg">
                Add Comment
              </h3>

              <textarea
                rows={4}
                placeholder="Write your comment..."
                className="w-full rounded-xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                Post Comment
              </button>

            </div>

            {/* Comments */}

            <div className="space-y-6">

              <h3 className="font-semibold text-lg">
                Comments
              </h3>

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-b pb-5"
                >

                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/default-avatar.png"
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h4 className="font-semibold">
                        Athlete Name
                      </h4>

                      <span className="text-xs text-gray-500">
                        5 mins ago
                      </span>

                    </div>

                    <p className="mt-2 text-gray-700">
                      Great opportunity. Looking forward to
                      participating in this trial.
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}