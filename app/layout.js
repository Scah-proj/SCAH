import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GooglePlacesProvider from "./GooglePlacesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SCAH",
  description: "Next generation scouting",
  icons: {
    icon: "/run.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 👇 ADD YOUR SCRIPT HERE */}
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GooglePlacesProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            {children}
          </GoogleOAuthProvider>
        </GooglePlacesProvider>
      </body>
    </html>
  );
}
