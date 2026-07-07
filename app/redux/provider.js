"use client";

import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./store";
import GooglePlacesProvider from "../GooglePlacesProvider";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <GooglePlacesProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>
      </GooglePlacesProvider>
    </Provider>
  );
}