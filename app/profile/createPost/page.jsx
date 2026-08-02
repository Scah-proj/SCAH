"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Camera,
  Smile,
  CalendarClock,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { useCreatePostMutation } from "../../redux/api/feedApi";
import {
  useGetMyProfileQuery,
  useGetAllProfilesQuery,
  useLazySearchUsersQuery,
} from "../../redux/api/profileApi";

import {
  setCreatingPost,
  setCreatePostSuccess,
  setCreatePostError,
} from "../../redux/features/feed/feedSlice";

const normalizeProfiles = (payload) => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.profiles)) return payload.profiles;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;

  return [];
};

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function CreatePost() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [createPost] = useCreatePostMutation();
  const { data: profile } = useGetMyProfileQuery();
  const { data: allProfilesResponse } = useGetAllProfilesQuery({
    page: 1,
    limit: 20,
  });
  const [triggerSearchUsers, { data: searchUsersResponse }] =
    useLazySearchUsersQuery();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  const [type, setType] = useState("highlight");
  const [sport, setSport] = useState("Football");
  const [tags] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [privacy, setPrivacy] = useState("everyone");
  const [showPrivacy, setShowPrivacy] = useState(false);

  const profilePicture =
    profile?.profilePicture ||
    profile?.picture ||
    profile?.profile?.profilePicture ||
    profile?.profile?.media?.profilePicture ||
    "/defaultImage.jpg";

  const profileLocation =
    profile?.location ||
    profile?.profile?.location ||
    profile?.athleteProfile?.location ||
    {};

  useEffect(() => {
    if (!mentionQuery.trim()) return;

    const timeoutId = setTimeout(() => {
      triggerSearchUsers(mentionQuery.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mentionQuery, triggerSearchUsers]);

  const allProfiles = normalizeProfiles(allProfilesResponse);
  const searchProfiles = normalizeProfiles(searchUsersResponse);
  const tagSuggestions = mentionQuery.trim()
    ? searchProfiles
    : allProfiles;

  const canPost =
    content.trim().length > 0 ||
    images.length > 0;

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const closeCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    setIsCameraOpen(false);
    setCameraError("");
  };

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not supported by this browser.");
      setIsCameraOpen(true);
      return;
    }

    setCameraError("");
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });

      cameraStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setCameraError(
        err?.name === "NotAllowedError"
          ? "Camera permission was denied. Please allow it and try again."
          : "We couldn't access your camera."
      );
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth || !video?.videoHeight) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], `camera-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      setImages((prev) => [...prev, { file, preview: URL.createObjectURL(file) }]);
      closeCamera();
    }, "image/jpeg", 0.92);
  };

  useEffect(() => () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

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
        taggedUsers,
        location: {
          city: profileLocation?.city || "",
          country: profileLocation?.country || "",
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

    // Allow selecting/capturing the same file again later
    // (browsers won't fire onChange twice for an identical value).
    e.target.value = "";
  };

  const handleContentChange = (e) => {
    const nextValue = e.target.value;
    setContent(nextValue);

    const lastAtIndex = nextValue.lastIndexOf("@");
    if (lastAtIndex === -1) {
      setShowMentionDropdown(false);
      setMentionQuery("");
      return;
    }

    const afterAt = nextValue.slice(lastAtIndex + 1);
    const mentionValue = afterAt.split("\n")[0];

    setMentionQuery(mentionValue);
    setShowMentionDropdown(Boolean(mentionValue));
  };

  const addTaggedUser = (user) => {
    const fullName =
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.name ||
      user?.username ||
      "User";
    const userId = user?._id || user?.id;

    if (userId) {
      setTaggedUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    }

    setContent((prev) => {
      const pattern = new RegExp(`@${escapeRegExp(mentionQuery || "")}$`);
      return prev.replace(pattern, `@${fullName}`);
    });
    setShowMentionDropdown(false);
    setMentionQuery("");
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
            src={profilePicture}
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
          <div className="relative">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] resize-none text-sm outline-none"
            />

            {showMentionDropdown && (
              <div className="absolute z-20 mt-2 max-h-44 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {tagSuggestions.length > 0 ? (
                  tagSuggestions.map((user, index) => {
                    const fullName =
                      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
                      user?.name ||
                      user?.username ||
                      "User";
                    const userKey =
                      user?._id ||
                      user?.id ||
                      `${fullName}-${index}`;

                    return (
                      <button
                        key={userKey}
                        type="button"
                        onClick={() => addTaggedUser(user)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                          {fullName.charAt(0).toUpperCase()}
                        </div>
                        <span>{fullName}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No people found
                  </div>
                )}
              </div>
            )}
          </div>

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

            {/* Camera — opens the device's native camera on mobile via
                the `capture` attribute, instead of the photo gallery. */}
            <button
              type="button"
              className="cursor-pointer"
              onClick={openCamera}
              aria-label="Open camera"
            >
              <Camera size={22} />
            </button>

            {/* Emoji */}
            <button>
              <Smile size={22} />
            </button>

            {/* Schedule */}
            <button>
              <CalendarClock size={22} />
            </button>
          </div>

          {isCameraOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Take a photo</h2>
                  <button type="button" onClick={closeCamera} className="text-sm text-gray-600">
                    Cancel
                  </button>
                </div>

                {cameraError ? (
                  <p className="py-8 text-center text-sm text-red-600">{cameraError}</p>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="aspect-[3/4] w-full rounded-lg bg-black object-cover"
                  />
                )}

                {!cameraError && (
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="mt-4 w-full rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700"
                  >
                    Capture photo
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
