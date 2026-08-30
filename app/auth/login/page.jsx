"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useLoginMutation, useGoogleAuthMutation } from "../../redux/api/authApi";
import { setCredentials } from "../../redux/features/auth/authSlice";

// Separate the form component so useSearchParams is safely inside a Suspense boundary
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Read the redirect parameter directly (Next.js automatically decodes this)
  const redirectTo = searchParams.get("redirectTo");

  const [login, { isLoading }] = useLoginMutation();
  const [googleAuth] = useGoogleAuthMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (errorMsg) setErrorMsg("");
  };

  const showInvalidCredentials = (message = "Invalid email or password") => {
    setFieldErrors({ email: message, password: message });
    setErrorMsg(message);
  };

  const handleAuthSuccess = (response) => {
    const is2FA = response?.require2FA || response?.data?.require2FA;
    const userId = response?.userId || response?.data?.userId;

    if (is2FA && userId) {
      const nextUrl = redirectTo
        ? `/auth/verify-2fa?userId=${userId}&redirectTo=${encodeURIComponent(redirectTo)}`
        : `/auth/verify-2fa?userId=${userId}`;
      router.push(nextUrl);
      return;
    }

    const token = response?.token || response?.data?.token;
    if (!token) {
      showInvalidCredentials();
      return;
    }

    const user = {
      ...(response?.data?.user || response?.user),
      role: response?.data?.onboarding?.role || response?.onboarding?.role,
      onboarding: response?.data?.onboarding || response?.onboarding,
      scoutProfile: response?.data?.scoutProfile || response?.scoutProfile,
      athleteProfile: response?.data?.athleteProfile || response?.athleteProfile,
    };

    // Dispatch credentials (this updates Redux, LocalStorage, and document.cookie)
    dispatch(setCredentials({ user, token }));

    // Target destination fallback
    const targetDestination = redirectTo || "/userfeed";

    // Crucial: Refresh router cache so Next.js reads the updated cookie before navigation
    router.refresh();
    router.replace(targetDestination);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setFieldErrors({ email: "", password: "" });

    const email = formData.email.trim();
    const password = formData.password.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email) || !password) {
      showInvalidCredentials();
      return;
    }

    try {
      const response = await login(formData).unwrap();
      handleAuthSuccess(response);
    } catch (error) {
      showInvalidCredentials(error?.data?.message || "Invalid email or password");
    }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;

    try {
      setErrorMsg("");
      const response = await googleAuth({
        token: credentialResponse.credential, // Fixed: payload key now matches req.body.token expected by backend
      }).unwrap();

      handleAuthSuccess(response);
    } catch (error) {
    setErrorMsg(error?.data?.error?.message);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <h2 className="text-2xl font-semibold flex items-center justify-center mt-10 text-teal-900">
        Sign in
      </h2>
      <h3 className="text-3xl font-bold text-teal-800 mt-15">Welcome Back</h3>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border shadow-sm p-2 focus:border-teal-600 focus:ring-teal-600 sm:text-sm ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border shadow-sm p-2 pr-10 focus:border-teal-600 focus:ring-teal-600 sm:text-sm ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="text-right mt-1">
            <Link
              href="/auth/forgot"
              className="text-sm text-teal-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {errorMsg && (
          <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
        )}
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <GoogleLogin
        onSuccess={handleGoogleAuth}
        onError={() => setErrorMsg("Google Sign-In failed.")}
      />

      <p className="text-sm text-center text-gray-600 mt-5">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-teal-700 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
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

      {/* Right side form container wrapped in Suspense */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-16">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}