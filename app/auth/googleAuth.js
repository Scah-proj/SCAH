
import { postRequest } from "../api";
import { useUserStore } from "../../lib/userStore";


export const handleGoogleSuccess = async (credentialResponse, router, setUser) => {
  
  const idToken = credentialResponse.credential;
 

  try {
    const response = await postRequest('/api/auth/google', { token: idToken });
console.log("Google auth response:", response);
    const result = response?.data;   
    if (result?.token) {
      localStorage.setItem('token', result.token);  
      console.log('Login successful');
       const fakeUser = {
    id: 1,
    name: "John Doe",
    role: "athlete", // or "scout"
  };
setUser(fakeUser);     
// Check if user still needs onboarding
      if (result.requiresOnboarding) {
        console.log('Redirecting to onboarding...');
        router.push('/onboarding');
      } else {
        console.log('Redirecting to feed...');
        router.push('/userfeed/feed');
      }
    } else {
      console.log('Login failed: No token found in response');
    }

  } catch (error) {
    console.error("Google auth error:", error);
  }
};
