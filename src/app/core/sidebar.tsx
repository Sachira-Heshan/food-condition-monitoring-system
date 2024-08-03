"use client";

import { useEffect, useState } from "react";
import Detail from "./detail/detail";

const SideBar = () => {
    const [show, setShow] = useState(false);

    useEffect(() => { 
        setShow(false);
    }, []);

    return (
        <div className={"p-2 bg-gray-cool-46 w-full h-full text-white"}>
        <div className="text-2xl p-2">
            <p>Welcome to the Smart IoT Food Monitoring System</p>
        </div>
        <div className="h-32 w-full py-6">
            <button
               className="w-44 text-center text-lg text-black font-bold bg-gray-300 rounded-lg"
               onClick={() => setShow(!show)}
            >
               Into Details
            </button>
         </div>
         <div>
            {show && (
                <div className="size-full">
                    {/* <p className="text-xl p-2">This is the sidebar</p> */}
                    <Detail/>
                </div>
            )}
         </div>
            
        </div>
    );
}

export default SideBar;