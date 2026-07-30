import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast"; // 1. Import Toaster
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import Providers from "./redux/provider";

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
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <Providers>
            <Toaster position="top-right" /> 
            {children}
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}