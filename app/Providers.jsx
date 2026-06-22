"use client"
import { useEffect } from "react";
import { useUserStore } from "../lib/userStore";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GooglePlacesProvider from "./GooglePlacesProvider";
import store from "../lib/store";


export default function Providers({ children }) {
    const { token, setUser, setToken, logout } = useUserStore();

    // useEffect( () =>{
    //     const token = localStorage.getItem("token");
    //     if (token){
    //         setToken(token);
    //     }
    //     fetch("", {
    //         headers :{
    //             Authorization : `Bearer ${token}`,
    //         },
    //     })
    //     .then((res) => {
    //         if (!res.ok) throw new Error("Failed to fetch user");
    //         return res.json();
    //     })
    //     .then((user) => {
    //         setUser(user);
    //     })
    //     .catch(() => {
    //         logout();   
    //     });
    // }
    //     ,[token]);

        // useEffect(() => {
            // const token = localStorage.getItem("token");
            // if (!token) {
            //     logout();
            //     return;
            // }
            // setToken(token);

            
        // }, []);
  return (
    <Provider store={store}>
      <GooglePlacesProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </GooglePlacesProvider>
    </Provider>
  );
}
