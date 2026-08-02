"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { handleGoogleSuccess } from "../googleAuth";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react"; 
import { useRegisterMutation } from "../../redux/api/authApi";

const Page = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.password) {
      setErrorMsg("Email and password are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      // Omit confirmPassword from the payload sent to the backend
      const { confirmPassword, ...payload } = formData;

      const result = await register(payload).unwrap();
      console.log('Account created successfully', result);

      const token = result?.token || result?.accessToken || result?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg(
        error?.data?.error?.message ||
        error?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="md:w-1/2 w-full bg-cover bg-center flex flex-col text-white p-8"
        style={{ backgroundImage: "url('/namee.png')" }}
      >
        <Link href="/home">
          <Image
            src="/yattr.png"
            alt="SCAH Logo"
            width={100}
            height={40}
            priority
            className="object-cover"
          />
        </Link>
        <div className="p-6 rounded-lg flex flex-col items-center justify-center mt-15 text-center w-full">
          <h1 className="text-3xl font-bold">Welcome to SCAH</h1>
          <p className="mt-2 text-sm">
            The ultimate platform for football scouts to connect with talents.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-6 md:p-10">
        <div className="w-full max-w-xl">
          <h2 className="text-xl md:text-3xl font-semibold text-center text-teal-900 mb-6">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="w-full">
                <label className="block text-md font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label className="block text-md font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-md font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-md font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-md font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
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
            onSuccess={(res) => handleGoogleSuccess(res, router, dispatch)}
            onError={() => console.log('Login Failed')}
          />

          <p className="text-sm text-center text-gray-600 mt-5">
            Have an account?{" "}
            <Link href="/auth/login" className="text-teal-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;