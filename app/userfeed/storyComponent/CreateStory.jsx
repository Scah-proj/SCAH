"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCreateStoryMutation } from "../../redux/api/storyApi";

export default function CreateStory({
  open,
  onClose,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  const [
    createStory,
    {
      isLoading,
      isSuccess,
      error,
    },
  ] = useCreateStoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setFile(null);
      setPreview("");
      setCaption("");
      onClose();
    }
  }, [isSuccess, onClose]);

  if (!open) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image or video.");
      return;
    }

    try {
      await createStory({
        media: file,
        mediaType: file.type.startsWith("video")
          ? "video"
          : "image",
        caption,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-center text-xl font-bold">
          Create Story
        </h2>

        <label className="flex h-44 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          {preview ? (
            file?.type.startsWith("video") ? (
              <video
                src={preview}
                controls
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={250}
                className="h-full w-full rounded-lg object-cover"
              />
            )
          ) : (
            <div className="text-center text-gray-500">
              <p className="font-medium">
                Click to upload
              </p>
              <p className="text-sm">
                Image or Video
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        <textarea
          value={caption}
          onChange={(e) =>
            setCaption(e.target.value)
          }
          placeholder="Write a caption..."
          className="mt-5 h-24 w-full resize-none rounded-lg border p-3 outline-none focus:border-teal-500"
        />

        {error && (
          <p className="mt-3 text-sm text-red-500">
            Failed to create story.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-lg bg-teal-600 px-5 py-2 font-medium text-white disabled:opacity-50"
          >
            {isLoading
              ? "Uploading..."
              : "Share Story"}
          </button>

        </div>
      </div>
    </div>
  );
}