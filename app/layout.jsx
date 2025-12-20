import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

// Define base URL for metadata (fallback to a placeholder if env not set)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somufilms.com";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Somu Films | Luxury Wedding Photography & Films",
    template: "%s | Somu Films",
  },
  description: "Capturing love stories with an editorial approach. Somu Films specializes in luxury wedding photography and cinematic films, blending raw emotions with timeless elegance.",
  keywords: [
    "Wedding Photography", 
    "Wedding Films", 
    "Luxury Weddings", 
    "Editorial Wedding Photography", 
    "Cinematic Wedding Films", 
    "Somu Films", 
    "Destination Weddings",
    "Indian Wedding Photographer"
  ],
  authors: [{ name: "Somu Films" }],
  creator: "Somu Films",
  publisher: "Somu Films",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Somu Films | Luxury Wedding Photography & Films",
    description: "Capturing love stories with an editorial approach. Blending raw emotions with timeless elegance.",
    url: baseUrl,
    siteName: "Somu Films",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/home-hero.jpg", // Using your hero image as default OG image
        width: 1200,
        height: 630,
        alt: "Somu Films - Luxury Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somu Films | Luxury Wedding Photography & Films",
    description: "Capturing love stories with an editorial approach.",
    images: ["/images/home-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    // Add apple touch icon if available
    // apple: "/apple-touch-icon.png",
  },
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

const soligantFont = localFont({
  variable: "--font-soligant",
  src: "../public/fonts/Soligant.otf",
  display: "swap", // Improves LCP for SEO
});

const mainFont = localFont({
  variable: "--font-main",
  src: "../public/fonts/main.otf",
  display: "swap",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${soligantFont.variable} ${mainFont.variable}`}>
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
