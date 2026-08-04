"use client";
import { useState } from "react";
import Link from "next/link";
import { useForgotPasswordMutation } from "../../redux/api/authApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const result = await forgotPassword({ email }).unwrap();
      setStatus({
        type: "success",
        message:
          result?.message ||
          "If an account exists for that email, a reset link has been sent.",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Forgot password</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-teal-800 focus:border-teal-800 disabled:bg-gray-100"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
          <p className="mt-4 text-center text-sm text-gray-500">
            Go back to{" "}
            <Link href="/auth/login" className="text-teal-800 hover:underline">
              Login
            </Link>
          </p>
        </form>

        {status && (
          <p
            role="status"
            className={`mt-4 text-sm text-center ${
              status.type === "error" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}