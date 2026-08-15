"use client";

import { useState, useEffect, useRef } from "react";
import { useCreateStoryMutation } from "../../redux/api/storyApi";

const MAX_FILE_SIZE_MB = 50;

const BACKGROUND_COLORS = [
  "#000000",
  "#7C3AED",
  "#DB2777",
  "#DC2626",
  "#EA580C",
  "#16A34A",
  "#0891B2",
  "#1D4ED8",
];

export default function CreateStory({ open, onClose }) {
  const [mode, setMode] = useState("media"); // "media" | "text"

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  const [textContent, setTextContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);

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
    setTextContent("");
    setBackgroundColor(BACKGROUND_COLORS[0]);
    setValidationError("");
    setMode("media");
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

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    // Clear whichever fields belong to the mode we're leaving
    revokeCurrentPreview();
    setFile(null);
    setPreview("");
    setValidationError("");
    setMode(nextMode);
  };

  const handleSubmit = async () => {
    if (mode === "media" && !file) {
      setValidationError("Please select an image or video.");
      return;
    }

    if (mode === "text" && !textContent.trim()) {
      setValidationError("Please write something for your story.");
      return;
    }

    try {
      if (mode === "media") {
        await createStory({
          media: file,
          mediaType: file.type.startsWith("video") ? "video" : "image",
          caption,
        }).unwrap();
      } else {
        await createStory({
          mediaType: "text",
          caption: textContent,
          backgroundColor,
          textColor: "#FFFFFF",
        }).unwrap();
      }
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

        {/* Mode toggle */}
        <div className="mb-5 flex rounded-lg border p-1">
          <button
            type="button"
            onClick={() => switchMode("media")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              mode === "media"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Photo / Video
          </button>
          <button
            type="button"
            onClick={() => switchMode("text")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              mode === "text"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Text
          </button>
        </div>

        {mode === "media" ? (
          <>
            <label className="flex h-44 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              {preview ? (
                file?.type.startsWith("video") ? (
                  <video
                    src={preview}
                    controls
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                 
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
          </>
        ) : (
          <>
            {/* Live text-story preview */}
            <div
              className="flex h-44 w-full items-center justify-center rounded-lg p-4 transition-colors"
              style={{ backgroundColor }}
            >
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Start typing..."
                maxLength={500}
                className="h-full w-full resize-none border-none bg-transparent text-center text-lg font-semibold text-white outline-none placeholder:text-white/70"
              />
            </div>

            {/* Background color picker */}
            <div className="mt-4 flex justify-center gap-2">
              {BACKGROUND_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setBackgroundColor(color)}
                  aria-label={`Set background color ${color}`}
                  className={`h-7 w-7 rounded-full ring-offset-2 ${
                    backgroundColor === color ? "ring-2 ring-teal-600" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </>
        )}

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