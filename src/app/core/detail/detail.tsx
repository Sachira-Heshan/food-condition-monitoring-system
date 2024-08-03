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
                <span>{deviceId}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Meal Type :</span>
                <span>{mealType}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Driver :</span>
                <span>{driver}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Vehicle Identifier :</span>
                <span>{vehicleIdentifier}</span>
            </p>
        </div>
    );
}

export default Detail;