"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Camera,
  User,
  Smile,
  CalendarClock,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
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

  const authUser = useSelector((state) => state.auth.user);

  const [createPost] = useCreatePostMutation();
  // Single call — this was being requested twice (as `profile` and
  // `myProfile`), which just doubles the network request for the same data.
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

  const [type] = useState("highlight"); // no UI toggle anymore; backend still expects this field
  const [sport, setSport] = useState("Football");
  const [tags] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);

  // Which preview (by index) is currently expanded to play with sound/controls.
  // Everything else in the grid stays a static, muted poster-frame thumbnail.
  const [playingPreviewIndex, setPlayingPreviewIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const myProfilePicture =
    profile?.profilePicture ||
    profile?.picture ||
    profile?.profile?.profilePicture ||
    profile?.profile?.media?.profilePicture ||
    authUser?.profilePicture ||
    authUser?.avatar ||
    null;

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
    setPlayingPreviewIndex((prev) => (prev === index ? null : prev));
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

  const addTaggedUser = (taggedUser) => {
    const fullName =
      [taggedUser?.firstName, taggedUser?.lastName].filter(Boolean).join(" ") ||
      taggedUser?.name ||
      taggedUser?.username ||
      "User";
    const userId = taggedUser?._id || taggedUser?.id;

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
<div className="mx-auto w-full min-h-screen bg-white p-4 md:max-w-md md:rounded-xl md:shadow-xl md:mt-10 flex flex-col">      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <Link href="/userfeed" className="text-gray-500">
          Cancel
        </Link>

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
  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 border shrink-0 flex items-center justify-center">
    {myProfilePicture ? (
      <Image
        src={myProfilePicture}
        alt="Profile"
        width={48}
        height={48}
        className="object-cover"
      />
    ) : (
      <User className="w-6 h-6 text-gray-500" />
    )}
  </div>

  <div className="flex-1 min-w-0">
    {/* Textarea + mention dropdown */}
    <div className="relative">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's on your mind?"
        className="w-full min-h-[120px] resize-none text-sm outline-none"
      />

      {showMentionDropdown && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-44 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {tagSuggestions.length > 0 ? (
            tagSuggestions.map((suggestedUser, index) => {
              const fullName =
                [suggestedUser?.firstName, suggestedUser?.lastName]
                  .filter(Boolean)
                  .join(" ") ||
                suggestedUser?.name ||
                suggestedUser?.username ||
                "User";

              const userKey =
                suggestedUser?._id ||
                suggestedUser?.id ||
                `${fullName}-${index}`;

              return (
                <button
                  key={userKey}
                  type="button"
                  onClick={() => addTaggedUser(suggestedUser)}
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
  <div className="grid grid-cols-3 gap-2 mt-3 max-h-72 overflow-y-auto">
    {images.map((img, index) => {
      const isVideo = img.file.type.startsWith("video/");
      const isPlaying = playingPreviewIndex === index;

      return (
        <div
          key={index}
          className="relative aspect-square w-full overflow-hidden rounded-lg bg-black"
        >
          {isVideo ? (
            isPlaying ? (
              <video
                src={img.preview}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
                onEnded={() => setPlayingPreviewIndex(null)}
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlayingPreviewIndex(index)}
                className="relative block h-full w-full"
                aria-label="Play video preview"
              >
                <video
                  src={img.preview}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  // Nudge the browser to decode and paint a real frame
                  // instead of showing a blank black box as the thumbnail.
                  onLoadedMetadata={(e) => {
                    if (!e.currentTarget.currentTime) {
                      e.currentTarget.currentTime = 0.1;
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="rounded-full bg-black/60 p-2">
                    <Play size={18} className="fill-white text-white" />
                  </div>
                </div>
              </button>
            )
          ) : (
            <Image
              src={img.preview}
              alt="preview"
              fill
              className="object-cover"
            />
          )}

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-sm text-white cursor-pointer"
          >
            ×
          </button>
        </div>
      );
    })}
  </div>
)}

    {error && (
      <p className="mt-2 text-sm text-red-500">
        {error}
      </p>
    )}

    {/* Action bar */}
    <div className="mt-4 flex items-center gap-5 text-gray-600">
      {/* Gallery */}
      <label className="cursor-pointer">
        <ImageIcon size={22} />

        <input
          type="file"
          accept="image/*, video/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />
      </label>

      {/* Camera */}
      <button
        type="button"
        className="cursor-pointer"
        onClick={openCamera}
        aria-label="Open camera"
      >
        <Camera size={22} />
      </button>
    </div>

    {/* Camera modal */}
    {isCameraOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Take a photo
            </h2>

            <button
              type="button"
              onClick={closeCamera}
              className="text-sm text-gray-600"
            >
              Cancel
            </button>
          </div>

          {cameraError ? (
            <p className="py-8 text-center text-sm text-red-600">
              {cameraError}
            </p>
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