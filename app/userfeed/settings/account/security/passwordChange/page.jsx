"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../../../../../components/ui/button";
import { MdArrowBack } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { useChangePasswordMutation } from "../../../../../redux/api/settingApi"; 

const Page = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Client-side validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setErrorMsg("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    try {
      // Sends exactly { currentPassword, newPassword } to backend
      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      setSuccessMsg(response?.message || "Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setErrorMsg(
        err?.data?.message || err?.error || "Failed to change password. Please check your credentials."
      );
    }
  };

  return (
    <div className="space-y-10 max-w-2xl px-4 md:px-6 py-12 mx-auto">
      <Link
        href="/userfeed/settings/account/security"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Password and Security</span>
      </Link>

      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
        Change Password
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        Password must be at least 8 characters in length including uppercase and
        lowercase, a number(s) and special characters.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errorMsg}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md">
            {successMsg}
          </div>
        )}

        <input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Updating..." : "Change Password"}
        </Button>
      </form>

      <div>
        <Link href="/settings/account" className="text-sm text-teal-500 hover:underline">
          Forgotten your password?
        </Link>
      </div>
    </div>
  );
};

export default Page;