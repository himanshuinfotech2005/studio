import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
export const metadata = {
  title: "Somu Films",
  description: "Luxury Wedding Photography & Films",
};

const soligantFont = localFont({
  variable: "--font-soligant",
  src: "../public/fonts/Soligant.otf",
});

const mainFont = localFont({
  variable: "--font-main",
  src: "../public/fonts/main.otf",
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
