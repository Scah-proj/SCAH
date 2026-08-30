"use client";

import { useState } from "react";
import { settingsSections } from "./navroutes";
import Link from "next/link";
import { ChevronRight, AlertTriangle, X } from "lucide-react";
import SearchSettings from "../../components/Search/SearchSettings";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useDeleteAccountMutation } from "../../redux/api/settingApi";

const Page = () => {
    const router = useRouter();
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [deleteFeedback, setDeleteFeedback] = useState("");
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

    const isFeedbackFilled = deleteFeedback.trim().length > 0;
    const isBusy = isDeleting || isSendingFeedback;

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            router.push("/");
        }
    };

    const confirmDeleteAccount = async () => {
        if (!isFeedbackFilled) return; // button is disabled anyway, this is a safety net

        setDeleteError("");

        // 1. Send feedback email first — required before deletion proceeds
        try {
            setIsSendingFeedback(true);
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: deleteFeedback.trim() }),
            });

            if (!res.ok) {
                throw new Error("Failed to send feedback");
            }
        } catch (error) {
            console.error("Feedback send failed:", error);
            setDeleteError("Unable to delete account right now. Please try again later.");
            setIsSendingFeedback(false);
            return;
        }
        setIsSendingFeedback(false);

        // 2. Proceed with account deletion
        try {
            await deleteAccount().unwrap();
            setShowDeleteToast(false);
            setDeleteFeedback("");
            router.push("/");
        } catch (error) {
            console.error("Delete account failed:", error);
            setDeleteError("Unable to delete account right now. Please try again later.");
        }
    };

    const closeToast = () => {
        setShowDeleteToast(false);
        setDeleteFeedback("");
        setDeleteError("");
    };

    return (
        <div className="relative max-w-2xl mx-auto px-4 py-8 pb-48 space-y-8">
            {/* Custom Interactive Delete Confirmation Toast */}
            {showDeleteToast && (
                <div className="fixed bottom-5 right-5 z-50 flex items-start gap-3 bg-white border border-gray-200 shadow-2xl rounded-xl p-4 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                            Delete account?
                        </h4>
                        <p className="text-xs text-gray-500">
                            This action is permanent and cannot be undone.
                        </p>

                        <div className="pt-1">
                            <label
                                htmlFor="delete-feedback"
                                className="text-xs font-medium text-gray-600 block mb-1"
                            >
                                Please tell us why you're leaving <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="delete-feedback"
                                value={deleteFeedback}
                                onChange={(e) => {
                                    setDeleteFeedback(e.target.value);
                                    if (deleteError) setDeleteError("");
                                }}
                                disabled={isBusy}
                                rows={2}
                                maxLength={500}
                                placeholder="e.g. not using it enough, switching to another app, privacy concerns..."
                                className="w-full text-xs border border-gray-200 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50"
                            />
                        </div>

                        {deleteError && (
                            <p className="text-xs text-red-600">{deleteError}</p>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                            <button
                                type="button"
                                onClick={confirmDeleteAccount}
                                disabled={isBusy || !isFeedbackFilled}
                                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSendingFeedback
                                    ? "Sending feedback..."
                                    : isDeleting
                                    ? "Deleting..."
                                    : "Yes, Delete"}
                            </button>
                            <button
                                type="button"
                                onClick={closeToast}
                                disabled={isBusy}
                                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={closeToast}
                        disabled={isBusy}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Settings
                </h1>
            </div>
            <div className="px-4 space-y-6">
                <div>
                    <SearchSettings />
                </div>
                <div className="space-y-4">
                    {settingsSections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                                {section.title}
                            </h2>
                            <div className="bg-white rounded-xl border">
                                {section.items.map((item) => (
                                    <div key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-500">{item.icon}</span>
                                                <span className="font-semibold">{item.label}</span>
                                            </div>
                                            <span className="text-gray-400"><ChevronRight size={18} /></span>
                                        </Link>
                                    </div>
                                ))}
                                <div className="px-3 py-2 flex items-center justify-center">
                                    <Link href="/userfeed/settings/account" className="text-sm text-gray-800">
                                        <p>{section.more}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="font-semibold flex flex-col space-y-4 ">
                    <p className="text-teal-700 cursor-pointer">Add account</p>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut || isBusy}
                        className="text-red-700 text-left w-fit disabled:opacity-50"
                    >
                        {isLoggingOut ? "Logging out..." : "Log out"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowDeleteToast(true)}
                        disabled={isLoggingOut || isBusy}
                        className="text-red-600 hover:text-red-800 text-left text-sm w-fit disabled:opacity-50"
                    >
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;