"use client";
import { postRequest } from "@/app/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
const params = useParams();
const token = params.token;
const [ verifiedMsg, setVerifiedMsg ] = useState(false);
const router = useRouter();

 useEffect(() => {
    const verifyEmail = async() =>{
       
    try { 
        await postRequest('', {token});
        setVerifiedMsg(true);
        router.push('/onboarding');
        
    } catch (error) {
        console.error('Error:', error);
        router.push('/auth/register');
    }
 }
 if (token) verifyEmail();
},
 [token, router]);

    return(
        <p>{verifiedMsg ? "Email Verified" : "Verifying Email..."}</p>
    )
};
export default Page;