import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "./dashboard/dashboard";
import SideBar from "./core/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={" bg-neutral-900 h gap-2 flex p-2  "}>
            <div className={"h-full w-1/4 min-w-[304px]"}>
               <SideBar />
            </div>
            <div className={"h-full w-full min-w-[304px]"}>
               <div className={"w-full py-2"}>
                  <Dashboard />
               </div>
            </div>
         </body>
      </html>
   );
}
