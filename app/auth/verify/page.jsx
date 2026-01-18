"use client";
import { postRequest } from "../../api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
     const [formData, setFormData] = useState({
    code: "",
    
  });

const params = useParams();
const token = params.token;
 const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState("");
const router = useRouter();

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const verifyEmail = async(e) =>{  
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try { 
        await postRequest('/api/auth/verify-email', formData);
        router.push('/onboarding');
        
    } catch (error) {
        console.error('Error:', error);
        setErrorMsg("Invalid code. Please try again.");
       
    }
 }



    return(
        <div>
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
            Verify Email
          </h2>

          <form onSubmit={verifyEmail} className="space-y-6">
            <div>
              <label className="block text-md font-medium">Verification Code</label>
              <input
                type="text"
                name="code"
                placeholder="Enter your verification code"
                className="mt-1 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={handleChange}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
            >
              {loading ? "Verifying Email..." : "Verify Email"}
              
            </button>
          
           {errorMsg && (
              <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>
            )}
          </form>

         

         
         
        </div>
      </div>
    </div>
        
        </div>
    )
};
export default Page;