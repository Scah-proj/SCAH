import { Lato } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";
import Providers from "./redux/provider";


const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://scah.club"),

  title: {
    default: "SCAH — Next Generation Scouting",
    template: "%s | SCAH",
  },

  description:
    "SCAH is a next-generation scouting platform connecting athletes, scouts, coaches, and sports communities.",

  keywords: [
    "SCAH",
    "sports scouting",
    "athletes",
    "football scouting",
    "sports network",
  ],
  authors: [{ name: "SCAH" }],

  creator: "SCAH",

  icons: {
    icon: "/run.png",
  },

  openGraph: {
    title: "SCAH — Next Generation Scouting",
    description:
      "Connect, discover, and showcase talent with SCAH.",
    url: "https://scah.club",
    siteName: "SCAH",
    type: "website",
    images: [
      {
        url: "/yattr.png",
        width: 1200,
        height: 630,
        alt: "SCAH — Next Generation Scouting",
      },
    ],
  },
};

export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={`${lato.variable} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <Providers>
            <Toaster position="top-right" richColors />
            {children}
            <CookieConsent />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}