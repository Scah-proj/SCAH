"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { getRequest, postRequest } from "../../api";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleSuccess } from "../googleAuth";
import { useUserStore } from "../../lib/userStore";

const Page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 const setUser = useUserStore((state) =>state.setUser)
 
     const router = useRouter();
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await postRequest('/api/auth/login', formData);
      console.log("Login response:", data);
      const token = data?.data?.token
      if (token) {
        localStorage.setItem('token', token);
        console.log('Login successful');
        // const user = await getRequest('/api/auth/me');
        // setUser(user.data)
        router.push('/userfeed/feed');
      } else {
        console.log('Login failed', data);
      }
      } catch (error) {
      console.error('Error:', error);
      setErrorMsg("Incorrect Email or password. please try again.");

    } finally {
      setLoading(false);
    }
      
    
    
    
    
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
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
        <div className="max-w-xl w-full mx-auto">
          <h2 className="text-2xl font-semibold flex items-center justify-center mt-10 text-teal-900">
            Sign in
          </h2>
          <h3 className="text-3xl font-bold text-teal-800 mt-15">
            Welcome Back
          </h3>

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
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 pr-10 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
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
                <a
                  href="/auth/forgot"
                  className="text-sm text-teal-700 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
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

          
           <GoogleLogin onSuccess={(res) => handleGoogleSuccess(res, router, setUser)}
            onError={() => console.log('Login Failed')}
            className = "w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition cursor-pointer">
            <FcGoogle className="mr-2" /> Continue with Google
            </GoogleLogin>

          

          
          <p className="text-sm text-center text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-teal-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;
