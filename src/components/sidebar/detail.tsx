"use client";

import { useState } from "react";


const Detail = () => {
    const [deviceId, setDeviceId] = useState("fms_00001");
    const [mealType, setMealType] = useState("Milk Products");
    const [driver, setDriver] = useState("John Doe");
    const [vehicleIdentifier, setVehicleIdentifier] = useState("VH-1234");
    
    return (
        <div className="p-2 w-full h-full text-white">
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Tracker ID :</span>
                <span className="text-black font-bold">{deviceId}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Meal Type :</span>
                <span className="text-black font-bold">{mealType}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Driver :</span>
                <span className="text-black font-bold">{driver}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Vehicle Identifier :</span>
                <span className="text-black font-bold">{vehicleIdentifier}</span>
            </p>
        </div>
    );
}

export default Detail;