"use client";

import { useEffect } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export default function GooglePlacesProvider({ children }) {
  useEffect(() => {
    async function loadGoogleAPI() {
     
      setOptions({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      });

     
      await importLibrary("places");
    }

    loadGoogleAPI();
  }, []);

  return <>{children}</>;
}
