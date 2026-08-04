"use client";

import { useState, useEffect, useRef } from "react";
import { useCreateStoryMutation } from "../../redux/api/storyApi";

const MAX_FILE_SIZE_MB = 50;

export default function CreateStory({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [validationError, setValidationError] = useState("");

  // Tracks the current blob: URL so we can revoke it the moment it's
  // replaced or no longer needed, instead of leaking it for the page's
  // lifetime.
  const objectUrlRef = useRef("");

  const [
    createStory,
    { isLoading, isSuccess, error },
  ] = useCreateStoryMutation();

  const revokeCurrentPreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }
  };

  const resetForm = () => {
    revokeCurrentPreview();
    setFile(null);
    setPreview("");
    setCaption("");
    setValidationError("");
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, onClose]);

  // Revoke the object URL if the component unmounts while a preview is
  // still active (e.g. user navigates away mid-upload).
  useEffect(() => {
    return () => revokeCurrentPreview();
  }, []);

  if (!open) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setValidationError(`File is too large — max ${MAX_FILE_SIZE_MB}MB.`);
      e.target.value = ""; // allow re-selecting the same file after fixing
      return;
    }

    setValidationError("");
    revokeCurrentPreview(); // drop the previous preview's blob URL before making a new one
    const url = URL.createObjectURL(selected);
    objectUrlRef.current = url;
    setFile(selected);
    setPreview(url);
  };

  const handleSubmit = async () => {
    if (!file) {
      setValidationError("Please select an image or video.");
      return;
    }

    try {
      await createStory({
        media: file,
        mediaType: file.type.startsWith("video") ? "video" : "image",
        caption,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-center text-xl font-bold">Create Story</h2>

        <label className="flex h-44 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          {preview ? (
            file?.type.startsWith("video") ? (
              <video
                src={preview}
                controls
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              // Plain <img>, not next/image: next/image runs blob: URLs
              // through the image optimizer, which doesn't handle local
              // file previews correctly.
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            )
          ) : (
            <div className="text-center text-gray-500">
              <p className="font-medium">Click to upload</p>
              <p className="text-sm">Image or Video</p>
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
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="mt-5 h-24 w-full resize-none rounded-lg border p-3 outline-none focus:border-teal-500"
        />

        {validationError && (
          <p className="mt-3 text-sm text-red-500">{validationError}</p>
        )}

        {error && !validationError && (
          <p className="mt-3 text-sm text-red-500">Failed to create story.</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="rounded-lg border px-5 py-2 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-lg bg-teal-600 px-5 py-2 font-medium text-white disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Share Story"}
          </button>
        </div>
      </div>
    </div>
  );
}