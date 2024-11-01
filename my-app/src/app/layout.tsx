"use client";

import Main from "@/components/drawer/Main";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

const LayoutRoutes = ["/login", "/signup", "/signup/artist"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("admin");
  const isLayoutRoute = LayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={`antialiased bg-[#0F0202]`}>
        {isLayoutRoute || isAdminRoute ? <></> : <Navbar />}
        <div>
          {pathname === "/" && <Main/>}
          <div
            className={
              isLayoutRoute || isAdminRoute ? "" : "max-w-[1220px] m-auto"
            }
          >
            {children}

          </div>
        </div>
        {pathname === "/profile" ? <></> : <Footer/>}
      </body>
    </html>
  );
}
