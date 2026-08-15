import { Archivo_Black, Lora, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast"; // 1. Import Toaster
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import Providers from "./redux/provider";


const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});
const lora = Lora({
  weight: "400",
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${archivoBlack.variable} ${lora.variable} antialiased`}>
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