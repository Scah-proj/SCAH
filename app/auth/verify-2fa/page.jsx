"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { useVerify2FAMutation, useResendVerificationMutation } from "../../redux/api/authApi";
import { setCredentials } from "../../redux/features/auth/authSlice";

function Verify2FAForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const userId = searchParams.get("userId");
  const redirectTo = searchParams.get("redirectTo"); // Read the destination passed from login

  const [verify2FA, { isLoading }] = useVerify2FAMutation();
  const [resendVerification] = useResendVerificationMutation();

  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Resend code timer countdown
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Focus the first OTP input box on load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...otpCode];
    newCode[index] = value.slice(-1);
    setOtpCode(newCode);
    if (errorMsg) setErrorMsg("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtpCode(pastedData.split(""));
      setErrorMsg("");
      inputRefs.current[5].focus();
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    const fullCode = otpCode.join("");

    if (fullCode.length < 6) {
      setErrorMsg("Please enter the complete 6-digit code.");
      return;
    }

    if (!userId) {
      setErrorMsg("Session expired or missing user context. Please sign in again.");
      return;
    }

    try {
      const response = await verify2FA({
        userId,
        code: fullCode,
      }).unwrap();

      const token = response?.token || response?.data?.token;
      const user = {
        ...(response?.data?.user || response?.user),
        role: response?.data?.onboarding?.role || response?.onboarding?.role,
        onboarding: response?.data?.onboarding || response?.onboarding,
        scoutProfile: response?.data?.scoutProfile || response?.scoutProfile,
        athleteProfile: response?.data?.athleteProfile || response?.athleteProfile,
      };

      if (!token) {
        setErrorMsg("Verification failed. Missing session token.");
        return;
      }

      // Dispatch credentials (updates Redux, LocalStorage, AND sets document.cookie)
      dispatch(setCredentials({ user, token }));

      const targetDestination = redirectTo || "/userfeed";

      // Crucial: Refresh router cache so Next.js reads the updated cookie before navigation
      router.refresh();
      router.replace(targetDestination);
    } catch (error) {
      setErrorMsg(error?.data?.message || "Invalid or expired verification code.");
    }
  };

  const handleResend2FA = async () => {
    if (!canResend || !userId) return;
    setCanResend(false);
    setTimer(60);
    setErrorMsg("");

    try {
      await resendVerification({ userId }).unwrap();
    } catch (err) {
      setErrorMsg("Failed to resend verification code.");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-teal-800" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center text-teal-900">
        Two-Factor Verification
      </h2>

      <p className="mt-2 text-sm text-center text-gray-600">
        Enter the 6-digit verification code sent to your email to complete your login.
      </p>

      <form onSubmit={handleVerify2FA} className="mt-6 space-y-5">
        <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
          {otpCode.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              className="w-12 h-14 text-center text-xl font-semibold rounded-md border border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 outline-none"
            />
          ))}
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || otpCode.join("").length < 6}
          className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify & Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button
            type="button"
            onClick={handleResend2FA}
            disabled={!canResend}
            className={`font-medium ${
              canResend ? "text-teal-700 hover:underline" : "text-gray-400"
            }`}
          >
            {canResend ? "Resend Code" : `Resend in ${timer}s`}
          </button>
        </p>

        <div>
          <Link
            href="/auth/login"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Verify2FAPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side hero banner */}
      <div
        className="md:w-1/2 w-full bg-cover bg-center flex flex-col text-white p-8"
        style={{ backgroundImage: "url('/blame.png')" }}
      >
        <Link href="/home">
          <Image
            src="/yattr.png"
            alt="SCAH Logo"
            width={80}
            height={30}
            priority
            className="object-contain"
          />
        </Link>
        <div className="p-6 rounded-lg flex flex-col items-center justify-center text-center mt-15 w-full">
          <h1 className="text-3xl font-bold">Welcome back to SCAH</h1>
          <p className="mt-2 text-sm">
            The ultimate platform for football scouts to connect with talents.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-16">
        <Suspense fallback={<div>Loading...</div>}>
          <Verify2FAForm />
        </Suspense>
      </div>
    </div>
  );
}