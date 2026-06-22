const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint, method, data, token = null) {
  const authToken =
    token ??
    (typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null);

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && {
        Authorization: `Bearer ${authToken}`,
      }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const result = await res.json();

  if (!res.ok) {
  console.error("API Error:", result);

    const message =
      result?.error?.message ||         
      "Request failed";

    throw new Error(message);
}

  return result;
}

export const postRequest = (endpoint, data, token) =>
  request(endpoint, "POST", data, token);

export const getRequest = (endpoint, token) =>
  request(endpoint, "GET", null, token);


export async function uploadProfilePicture(file, token) {
  const formData = new FormData();
  formData.append("profilePicture", file);

  const res = await fetch(`${API_URL}/api/upload/profile-picture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    console.log("UPLOAD STATUS:", res.status);
    console.log("UPLOAD RESPONSE:", result);
    

  throw new Error(result?.error?.message || "Profile picture upload failed");  
  }

  return result;
}

export async function createPost(postData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("caption", postData.caption);
  formData.append("type", postData.type);
  formData.append("sport", postData.sport);

  formData.append("tags", postData.tags);

  formData.append(
    "location",
    JSON.stringify(postData.location)
  );

  postData.media.forEach((file) => {
    formData.append("media", file);
  });

  const res = await fetch(`${API_URL}/api/feed`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result?.error?.message || "Failed to create post"
    );
  }

  return result;
}