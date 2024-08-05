"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {
    const [deviceId, setDeviceId] = useState("fms_00001");
    const [foodCategory, setFoodCategory] = useState("Milk Products");
    const [driver, setDriver] = useState("John Doe");
    const [vehicleIdentifier, setVehicleIdentifier] = useState("VH-1234");
    const [taskStatus, setTaskStatus] = useState("In Progress");
    const [from, setFrom] = useState("Kandy");
    const [to, setTo] = useState("Colombo");

    const getPackageDetails = async () => {
        const taskId = "Task 1"
        try {
            const res = await axios.get(`/api/tasks/${taskId}`);
            const data = res.data;
            console.log(data);
            setDeviceId(data.task_data.device_ssid);
            setFoodCategory(data.task_data.food_category);
            setDriver(data.task_data.driver_name);
            setVehicleIdentifier(data.task_data.vehicle_id);
            setTaskStatus(data.task_data.task_status);
            setFrom(data.task_data.from);
            setTo(data.task_data.to);
        } catch (error) {
            console.log("Error occured during getting the data: ", error)
        }
    }

    useEffect(() => {
        getPackageDetails();
    }, [])
    
    return (
        <div className="p-2 w-full h-full text-white">
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Device ID :</span>
                <span className="text-black font-bold">{deviceId}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Food Category :</span>
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
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">Task Status :</span>
                <span className="text-black font-bold">{taskStatus}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">From :</span>
                <span className="text-black font-bold">{from}</span>
            </p>
            <p className="flex">
                <span className="w-40 text-teal-600 font-bold">To :</span>
                <span className="text-black font-bold">{to}</span>
            </p>
        </div>
    );
}

export default Detail;