"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { postRequest } from "@/app/api";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleSuccess } from "../googleAuth";
import { useEffect } from "react";

const Page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 const[ users, setUser ] = useState([]);
 
     const router = useRouter();
 
   useEffect(()=>{
     const storedUsers = JSON.parse(localStorage.getItem("users"));
     if(storedUsers){
         setUser(storedUsers);
     }
   },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await postRequest('https://jsonplaceholder.typicode.com/posts', { username: "testuser", password: "123456" });
      console.log(data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }

      router.push('/userfeed/feed');

    } catch (error) {
      console.error('Error:', error);
      setErrorMsg("Login failed. Please try again.");

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
            
            <Link href="/userfeed/feed">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            </Link>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
            )}
          
          </form>

          
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          
           <GoogleLogin onSuccess={(res) => handleGoogleSuccess(res, users, setUser, router)}
            onError={() => console.log('Login Failed')}
            className = "w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
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
