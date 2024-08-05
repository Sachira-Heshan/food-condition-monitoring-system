import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "../components/dashboard/dashboard";
import SideBar from "../components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Smart Food Condition Monitoring System",
   description: "Monitor the condition of the food based on sevaral environmental conditions during the transportation of the food.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={"bg-neutral-900 h gap-2 flex"}>
            <div className={`${inter.className} flex h-full w-full`}>
               {children}
            </div>
         </body>
      </html>
   );
}