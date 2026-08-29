import { postRequest } from "../api";

export const handleGoogleSuccess = async (credentialResponse, router) => {
  const idToken = credentialResponse?.credential;

  if (!idToken) {
    console.error("No Google credential received");
    return;
  }

  try {
    const response = await postRequest("/api/auth/google", {
      token: idToken,
    });

    console.log("Google auth response:", response);

    const result = response?.data;

    const token = result?.token;

    if (!token) {
      console.error("Google authentication failed: No token found");
      return;
    }

    // Save the real backend token
    localStorage.setItem("token", token);

    // Backend explicitly tells us whether onboarding is required
    if (result?.requiresOnboarding === true) {
      console.log("New Google user → onboarding");
      router.push("/onboarding");
      return;
    }

    // Existing/fully onboarded user
    console.log("Existing Google user → userfeed");
    router.push("/userfeed");

  } catch (error) {
    console.error("Google authentication error:", error);
  }
};