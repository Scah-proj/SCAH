"use client";

import Link from "next/link";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../../../components/ui/radio-group";
import {
  useGetAccountSettingsQuery,
  useEnableTwoFactorMutation,
  useVerifyTwoFactorMutation,
  useDisableTwoFactorMutation,
} from "../../../../../redux/api/settingApi"; 

const Page = () => {
  const [step, setStep] = useState("select"); 
  const [otpCode, setOtpCode] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  // RTK Query Hooks
  const { data: settingsData, isLoading: isLoadingSettings } =
    useGetAccountSettingsQuery();
  const [enableTwoFactor, { isLoading: isEnabling }] =
    useEnableTwoFactorMutation();
  const [verifyTwoFactor, { isLoading: isVerifying }] =
    useVerifyTwoFactorMutation();
  const [disableTwoFactor, { isLoading: isDisabling }] =
    useDisableTwoFactorMutation();

  // Extract settings safely from backend response shape
  const settings = settingsData?.data?.settings;

  // Determine if 2FA is currently enabled using the string or boolean response
  const is2FAEnabled =
    settings?.twoFactorStatus === "enabled" ||
    settings?.twoFactorEnabled === true;

  // 1. Request Email OTP (When enabling)
  const handleEnable2FA = async () => {
    setStatusMessage(null);
    try {
      await enableTwoFactor({ method: "email" }).unwrap();
      setStatusMessage({
        type: "success",
        text: "Verification code sent to your email!",
      });
      setStep("verify");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err?.data?.error?.message ||
          "Failed to send code. Please try again.",
      });
    }
  };

  // 2. Submit OTP Code (To finalize enabling)
  const handleVerify2FA = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid 6-digit code.",
      });
      return;
    }

    setStatusMessage(null);
    try {
      await verifyTwoFactor({ code: otpCode }).unwrap();
      setStatusMessage({
        type: "success",
        text: "Two-Factor Authentication enabled successfully!",
      });
      setStep("select");
      setOtpCode("");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err?.data?.error?.message ||
          "Invalid or expired verification code.",
      });
    }
  };

  // 3. Disable 2FA (When already enabled)
  const handleDisable2FA = async () => {
    setStatusMessage(null);
    try {
      await disableTwoFactor().unwrap();
      setStatusMessage({
        type: "success",
        text: "Two-Factor Authentication has been disabled.",
      });
      setStep("select");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err?.data?.error?.message || "Failed to disable 2FA.",
      });
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-500">
        Loading 2FA settings...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/userfeed/settings/account/security"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">
            Password and Security
          </span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Two-factor authentication
        </h1>
        <p className="text-sm text-gray-500">
          Add an extra layer of security to your account.
        </p>

        {/* Current State Badge */}
        <div className="pt-2">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-sm capitalize ${
              is2FAEnabled
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            Status: {is2FAEnabled ? "enabled" : "disabled"}
          </span>
        </div>
      </div>

      {/* Alert Messages */}
      {statusMessage && (
        <div
          className={`p-4 rounded-lg text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Step 1: Select Method & Toggle State */}
      {step === "select" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-lg font-bold text-gray-900 my-2">
              Preferred method
            </h3>

            {/* Email-only option */}
            <RadioGroup defaultValue="email" className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center justify-between border p-5  cursor-pointer hover:bg-gray-50 transition"
              >
                <div>
                  <span className="font-semibold text-gray-900">
                    Email Code
                  </span>
                  <p className="text-sm text-gray-500">
                    Receive a security verification code sent directly to your
                    registered email address.
                  </p>
                </div>
                <RadioGroupItem value="email" id="email" checked />
              </label>
            </RadioGroup>
          </div>

          <div className="space-y-4 flex flex-col items-center justify-center">
            {/* Dynamic Button based on 2FA State */}
            {is2FAEnabled ? (
              <button
                type="button"
                onClick={handleDisable2FA}
                disabled={isDisabling}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-5 rounded-sm cursor-pointer w-2/3 text-center transition disabled:opacity-50"
              >
                {isDisabling ? "Disabling..." : "Disable Two-Factor"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEnable2FA}
                disabled={isEnabling}
                className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-5 rounded-sm cursor-pointer w-2/3 text-center transition disabled:opacity-50"
              >
                {isEnabling ? "Sending Code..." : "Continue"}
              </button>
            )}

            <Link
              href="/userfeed/settings/account/security"
              className="text-gray-600 hover:text-gray-900 w-full text-center block text-sm"
            >
              I'll do this later
            </Link>
          </div>
        </div>
      )}

      {/* Step 2: Verification Input (Only shown when enabling) */}
      {step === "verify" && (
        <form onSubmit={handleVerify2FA} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              Enter Verification Code
            </h3>
            <p className="text-sm text-gray-500">
              Please enter the 6-digit OTP code sent to your email.
            </p>
          </div>

          <input
            type="text"
            maxLength={6}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full text-center text-2xl tracking-widest border rounded-xl p-4 focus:ring-2 focus:ring-teal-700 outline-none"
          />

          <div className="space-y-4 flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isVerifying || otpCode.length !== 6}
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-5 rounded-md cursor-pointer w-2/3 text-center transition disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify & Enable"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("select");
                setOtpCode("");
              }}
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;