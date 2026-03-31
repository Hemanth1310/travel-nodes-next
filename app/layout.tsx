import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layouts/Header";
import { getAuthUser } from "@/lib/auth";
import Sidebar from "@/components/layouts/Sidebar";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Nodes Diary",
  description: "Create a memory to share with everyone on your travel diary",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const authUser = await getAuthUser();
  const user = authUser || null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body suppressHydrationWarning className="min-w-screen min-h-screen md:flex bg-mist-50 ">
        <Sidebar user={user}/>
        <Header user={user} />
        <div className="mt-16 ml-22 md:w-full box-border overflow-y-scroll p-3 bg-red-500 ">
              {children}
        </div>
      </body>
    </html>
  );
}
