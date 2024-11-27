import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Welcome to Fluffly – The Ultimate Pet Care & Social Platform",
  description:
    "Join Fluffly to connect with fellow pet lovers, track your pet's health, discover pet-friendly places, and more. Your all-in-one pet care companion!",
  applicationName: "Fluffly App",
  keywords: [
    "pet care app",
    "pet social network",
    "pet health tracker",
    "pet-friendly platform",
    "pet owners community",
    "pet tips",
    "pet events",
  ],
  openGraph: {
    title: "Welcome to Fluffly – The Ultimate Pet Care & Social Platform",
    description:
      "Connect with pet owners, track your pet’s wellness, and find pet-friendly resources all in one place.",
    siteName: "Fluffly App",
    locale: "en_US",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
