"use client";

import { useState } from "react";
import axios from "axios";

const Detail = () => {
    const [deviceId, setDeviceId] = useState("fms_00001");
    const [foodCategory, setFoodCategory] = useState("Milk Products");
    const [driver, setDriver] = useState("John Doe");
    const [vehicleIdentifier, setVehicleIdentifier] = useState("VH-1234");

    const getPackageDetails = async () => {
        try {
            const res = await axios.get("/api/tasks");
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.log("Error occured during getting the data: ", error)
        }
    }
    
    return (
        <div className="p-2 w-full h-full text-white">
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Tracker ID :</span>
                <span className="text-black font-bold">{deviceId}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Meal Type :</span>
                <span className="text-black font-bold">{foodCategory}</span>
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