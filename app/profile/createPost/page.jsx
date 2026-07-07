"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Smile,
  CalendarClock,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../lib/userStore";

import { useDispatch } from "react-redux";
import { useCreatePostMutation } from "../../redux/api/feedApi";

import {
  setCreatingPost,
  setCreatePostSuccess,
  setCreatePostError,
} from "../../redux/features/feed/feedSlice";

export default function CreatePost() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const [createPost] = useCreatePostMutation();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const [type, setType] = useState("highlight");
  const [sport, setSport] = useState("Football");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [privacy, setPrivacy] = useState("everyone");
  const [showPrivacy, setShowPrivacy] = useState(false);

  const canPost =
    content.trim().length > 0 ||
    images.length > 0;

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      setError("");

      dispatch(setCreatingPost(true));
      dispatch(setCreatePostError(null));

      const response = await createPost({
        caption: content,
        type,
        sport,
        tags,
        location: {
          city: user?.location?.city || "",
          country: user?.location?.country || "",
        },
        media: images.map((img) => img.file),
      }).unwrap();

      console.log("Post Created:", response);

      dispatch(setCreatePostSuccess(true));

      router.replace("/userfeed");
    } catch (err) {
      console.error("Create Post Error:", err);

      const message =
        err?.data?.message ||
        err?.data?.error ||
        err?.message ||
        "Failed to create post";

      setError(message);

      dispatch(setCreatePostError(message));
    } finally {
      dispatch(setCreatingPost(false));
      setLoading(false);
    }
  };

  const privacyOptions = {
    everyone: "Everyone can reply to this post",
    community: "Only community members can reply",
    private: "Only you can see and reply",
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
  };

  return (
    <div className="mx-auto w-full h-screen bg-white p-4 md:max-w-md md:rounded-xl md:shadow-xl md:mt-10 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <Link href="/userfeed" className="text-gray-500">
          Cancel
        </Link>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setType("highlight")}
            className={`px-3 py-1 rounded-full text-sm ${
              type === "highlight"
                ? "bg-teal-600 text-white"
                : "border"
            }`}
          >
            Highlight
          </button>

          <button
            onClick={() => setType("update")}
            className={`px-3 py-1 rounded-full text-sm ${
              type === "update"
                ? "bg-teal-600 text-white"
                : "border"
            }`}
          >
            Update
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={loading || !canPost}
          className={`px-4 py-1 cursor-pointer rounded-full text-sm transition ${
            loading || !canPost
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-600 text-white"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* User + content */}
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border">
          <Image
            src={user?.profilePicture || "/defaultImage.jpg"}
            alt="Profile"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          {/* Privacy dropdown */}
          <div className="relative inline-block mb-2">
            <button
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="flex items-center gap-1 text-sm border px-3 py-1 rounded-full"
            >
              {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
              <ChevronDown size={14} />
            </button>

            {showPrivacy && (
              <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow w-48">
                {Object.keys(privacyOptions).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPrivacy(key);
                      setShowPrivacy(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-500 mb-2">
            {privacyOptions[privacy]}
          </p>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full min-h-[120px] resize-none text-sm outline-none"
          />

          {/* Image previews */}
          {images.length > 0 && (
            <div className="relative flex gap-2 overflow-x-auto mt-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0"
                >
                  <Image
                    src={img.preview}
                    alt="preview"
                    fill
                    className="object-cover"
                  />

                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-[5px] right-1 bg-black/10 cursor-pointer text-black rounded-full w-5 h-5"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

          {/* Action bar */}
          <div className="flex items-center gap-5 mt-4 text-gray-600">
            {/* Gallery */}
            <label className="cursor-pointer">
              <ImageIcon size={22} />

              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>

            {/* Emoji */}
            <button>
              <Smile size={22} />
            </button>

            {/* Schedule */}
            <button>
              <CalendarClock size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}