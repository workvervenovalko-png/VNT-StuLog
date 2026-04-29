import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SCHOOL_NAME || "EduSphere",
  description: `${process.env.NEXT_PUBLIC_SCHOOL_NAME || "EduSphere"} | Empowering Education, Simplifying Management.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {children} <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
