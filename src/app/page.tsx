import DashboardPage from "@/components/dashboard/dashboard";
import SideBar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
     <main className="flex min-h-screen w-full">
        <div className={"h-full w-full flex"}>
           <div className={"h-full w-1/4 min-w-[300px]"}>
              <SideBar />
           </div>
           <div className={"h-full w-3/4 min-w-[300px]"}>
              <DashboardPage />
           </div>
        </div>
     </main>
  );
}
