"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../../../../redux/api/authApi";

const REDIRECT_DELAY_MS = 2500;
const MIN_PASSWORD_LENGTH = 6;

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tokenFromUrl = searchParams.get("token") || "";
  // Step is fully derived from the URL — no separate state/effect needed,
  // which also avoids a flash of the wrong step on first render.
  const step = tokenFromUrl ? "RESET_PASSWORD" : "REQUEST_RESET";

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  const passwordsMatch = newPassword === confirmPassword;
  const passwordLongEnough = newPassword.length >= MIN_PASSWORD_LENGTH;
  const canSubmitReset =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    passwordsMatch &&
    passwordLongEnough;

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const result = await forgotPassword({ email: email.trim() }).unwrap();
      setStatus({
        type: "success",
        message:
          result?.message ||
          "If an account exists for that email, password reset instructions have been sent.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err?.data?.message ||
          err?.data?.error?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!tokenFromUrl) {
      setStatus({
        type: "error",
        message: "No reset token found. Please click the link sent to your email.",
      });
      return;
    }

    if (!passwordsMatch) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!passwordLongEnough) {
      setStatus({
        type: "error",
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      });
      return;
    }

    try {
      const result = await resetPassword({
        token: tokenFromUrl,
        newPassword,
      }).unwrap();

      setStatus({
        type: "success",
        message: result?.message || "Password reset successful! Redirecting to login...",
      });

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, REDIRECT_DELAY_MS);
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err?.data?.message ||
          err?.data?.error?.message ||
          "Invalid or expired reset token. Please request a new link.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <h1 className="text-xl font-bold">
            {step === "REQUEST_RESET" ? "Forgot password" : "Reset your password"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {step === "REQUEST_RESET"
              ? "Enter your email address to receive a password reset link."
              : "Enter your new password below."}
          </p>
        </div>

        {step === "REQUEST_RESET" && (
          <form onSubmit={handleRequestReset}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isForgotLoading}
              autoComplete="email"
              className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-teal-800 focus:border-teal-800 disabled:bg-gray-100 text-sm"
              placeholder="name@example.com"
              required
            />
            <button
              type="submit"
              disabled={isForgotLoading}
              className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-900 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isForgotLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {step === "RESET_PASSWORD" && (
          <form onSubmit={handleResetPassword} className="space-y-3">
            <div>
              <label htmlFor="newPassword" className="block mb-1 text-sm font-medium">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isResetLoading}
                autoComplete="new-password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-teal-800 focus:border-teal-800 disabled:bg-gray-100 text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isResetLoading}
                autoComplete="new-password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-teal-800 focus:border-teal-800 disabled:bg-gray-100 text-sm"
                placeholder="••••••••"
                required
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isResetLoading || !canSubmitReset}
              className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-900 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium mt-2"
            >
              {isResetLoading ? "Resetting..." : "Reset Password"}
            </button>

            <Link
              href="/auth/forgot-password"
              className="w-full text-xs text-gray-500 hover:underline mt-2 text-center block"
            >
              Need a new reset email? Request another link
            </Link>
          </form>
        )}

        {status && (
          <p
            role={status.type === "error" ? "alert" : "status"}
            className={`mt-4 text-sm text-center p-2.5 rounded ${
              status.type === "error"
                ? "text-red-700 bg-red-50 border border-red-200"
                : "text-emerald-700 bg-emerald-50 border border-emerald-200"
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="pt-2 text-center border-t border-gray-100">
          <Link href="/auth/login" className="text-xs text-gray-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}