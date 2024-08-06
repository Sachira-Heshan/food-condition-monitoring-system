"use client";

import DeviceReadings from "@/components/device/deviceReadings";
import SideBar from "@/components/sidebar/sidebar";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams<{device: string}>();

   return (
      <main className="flex min-h-screen w-full">
         <div className={"h-full w-full flex flex-col-reverse 2xl:flex-row"}>
            <div className={"h-full w-full 2xl:w-1/4 min-w-[300px]"}>
               <SideBar />
            </div>
            <div className={"h-full w-full 2xl:w-3/4 min-w-[300px]"}>
               <DeviceReadings device={params.device} />
            </div>
         </div>
      </main>
   );
}
