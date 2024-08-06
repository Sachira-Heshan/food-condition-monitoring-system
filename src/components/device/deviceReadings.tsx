"use client";
import React, { useEffect, useState } from "react";
import LineChart from "@/components/chart/lineChart";
import axios from "axios";

interface Data {
   data: {
      mpu6050: {
         acc_x: number;
         acc_y: number;
         acc_z: number;
         gyro_x: number;
         gyro_y: number;
         gyro_z: number;
      };
      temperature: number;
      relative_humidity: number;
      light_intensity: number;
      air_quality: number;
   };
   _id: string;
   timestamp: string;
   device_id: string;
}

export default function DeviceReadings({ device }: { device: string }) {
   const [rawData, setRawData] = useState([]);

   const [temperatureData, setTemperatureData] = useState<Array<number>>([]);
   const [humidityData, setHumidityData] = useState<Array<number>>([]);
   const [vibrationData, setVibrationData] = useState<Array<number>>([]);

   const [accelerationXData, setAccelerationXData] = useState<Array<number>>(
      []
   );
   const [accelerationYData, setAccelerationYData] = useState<Array<number>>(
      []
   );
   const [accelerationZData, setAccelerationZData] = useState<Array<number>>(
      []
   );

   const [gyroscopeXData, setGyroscopeXData] = useState<Array<number>>([]);
   const [gyroscopeYData, setGyroscopeYData] = useState<Array<number>>([]);
   const [gyroscopeZData, setGyroscopeZData] = useState<Array<number>>([]);

   const [airQualityData, setAirQualityData] = useState<Array<number>>([]);

   const [lightData, setLightData] = useState<Array<number>>([]);
   const [timestamps, setTimestamps] = useState<Array<string>>([]);

   let temperatureOptions = {
      series: [
         {
            data: temperatureData,
         },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#77B6EA"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Temperature Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value);
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, 
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Temperature (°C)",
            style: {
               color: "#000000",
            },
         },
         min: temperatureData.length > 0 ? Math.min(...temperatureData) - 5 : 0,
         max:
            temperatureData.length > 0 ? Math.max(...temperatureData) + 5 : 100,
      },
   };

   let humidityOptions = {
      series: [
         {
            data: humidityData,
         },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#11c700"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Humidity Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value); // The formatter function overrides format property
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Use 24-hour format
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Humidity (%)",
            style: {
               color: "#000000",
            },
         },
         min: humidityData.length > 0 ? Math.min(...humidityData) - 5 : 0,
         max: humidityData.length > 0 ? Math.max(...humidityData) + 5 : 100,
      },
   };

   let vibrationOptions = {
      series: [
         {
            // name: "Acceleration X",
            data: vibrationData,
         },
         // {
         //    name: "Acceleration Y",
         //    data: accelerationYData,
         // },
         // {
         //    name: "Acceleration Z",
         //    data: accelerationZData,
         // },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#bf1900"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Vibration Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value); // The formatter function overrides format property
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Use 24-hour format
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Vibration",
            style: {
               color: "#000000",
            },
         },
         min: vibrationData.length > 0 ? Math.min(...vibrationData) - 5 : 0,
         max: vibrationData.length > 0 ? Math.max(...vibrationData) + 5 : 100,
      },
      legend: {
         position: "top",
         horizontalAlign: "right",
         floating: true,
         offsetY: -25,
         offsetX: -5,
      },
   };

   let lightOptions = {
      series: [
         {
            data: lightData,
         },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#fcba03"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Light Intensity Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value); // The formatter function overrides format property
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Use 24-hour format
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Light Intensity (LUX)",
            style: {
               color: "#000000",
            },
         },
         min: lightData.length > 0 ? Math.min(...lightData) - 5 : 0,
         max: lightData.length > 0 ? Math.max(...lightData) + 5 : 100,
      },
   };

   let gyroscopeOptions = {
      series: [
         {
            name: "Gyroscope X",
            data: gyroscopeXData,
         },
         {
            name: "Gyroscope Y",
            data: gyroscopeYData,
         },
         {
            name: "Gyroscope Z",
            data: gyroscopeZData,
         },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#bf1900", "#11c700", "#fcba03"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Gyroscope Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value); // The formatter function overrides format property
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Use 24-hour format
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Gyroscope (°)",
            style: {
               color: "#000000",
            },
         },
         min: gyroscopeXData.length > 0 ? Math.min(...gyroscopeXData) - 5 : 0,
         max: gyroscopeXData.length > 0 ? Math.max(...gyroscopeXData) + 5 : 100,
      },
      legend: {
         position: "top",
         horizontalAlign: "right",
         floating: true,
         offsetY: -25,
         offsetX: -5,
      },
   };

   let airQualityOptions = {
      series: [
         {
            data: airQualityData,
         },
      ],
      chart: {
         height: 350,
         type: "line",
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
         },
         zoom: {
            enabled: false,
         },
         toolbar: {
            show: false,
         },
      },
      colors: ["#fcba03"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Air Quality Variation",
         align: "center",
         style: {
            color: "#000000",
         },
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: timestamps,
         title: {
            text: "Time",
            style: {
               color: "#000000",
            },
         },
         labels: {
            formatter: function (value: string, timestamp: string) {
               const date = new Date(value); // The formatter function overrides format property
               const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Use 24-hour format
               });
               return formattedDate;
            },
         },
      },
      yaxis: {
         title: {
            text: "Air Quality (ppm)",
            style: {
               color: "#000000",
            },
         },
         min: airQualityData.length > 0 ? Math.min(...airQualityData) - 5 : 0,
         max: airQualityData.length > 0 ? Math.max(...airQualityData) + 5 : 100,
      },
   };

   // const getChartData = async () => {
   //    try {
   //       const response = await axios.get("/api/dashboard");
   //       setRawData(response.data.data);
   //       processData(response.data.data);
   //       console.log(response.data.data);
   //    } catch (error) {
   //       console.error("Error getting data from the server!", error);
   //    }
   // };

   const getRealChartData = async () => {
      try {
         const response = await axios.get(`/api/sensor-readings/${device}`);
         console.log(response)
         setRawData(response.data.sensor_readings);
         processData(response.data.sensor_readings);
         console.log(response.data.sensor_readings);
      } catch (error) {
         console.error("Error getting data from the server!", error);
      }
   };

   const calculateAcceleration = () => {
      const accelerationData: Array<number> = [];
      for (let i = 0; i < accelerationXData.length; i++) {
         const acceleration = Math.sqrt(
            Math.pow(accelerationXData[i], 2) +
               Math.pow(accelerationYData[i], 2) +
               Math.pow(accelerationZData[i], 2)
         );
         accelerationData.push(acceleration);
      }
      setVibrationData(accelerationData);
      console.log("ACCELERATION: ", accelerationData);
   };

   const processData = (data: Array<Data>) => {
      const tempData: Array<number> = [];
      const humidityData: Array<number> = [];
      // const vibrationData: Array<number> = [];

      const accelerationXData: Array<number> = [];
      const accelerationYData: Array<number> = [];
      const accelerationZData: Array<number> = [];

      const gyroscopeXData: Array<number> = [];
      const gyroscopeYData: Array<number> = [];
      const gyroscopeZData: Array<number> = [];

      const airQualityData: Array<number> = [];

      const lightData: Array<number> = [];
      const timestampsData: Array<string> = [];

      data.forEach((item: Data) => {
         tempData.push(item.data.temperature);
         humidityData.push(item.data.relative_humidity);
         // vibrationData.push(item.data.mpu6050.acc_x);

         accelerationXData.push(item.data.mpu6050.acc_x);
         accelerationYData.push(item.data.mpu6050.acc_y);
         accelerationZData.push(item.data.mpu6050.acc_z);

         gyroscopeXData.push(item.data.mpu6050.gyro_x);
         gyroscopeYData.push(item.data.mpu6050.gyro_y);
         gyroscopeZData.push(item.data.mpu6050.gyro_z);

         airQualityData.push(item.data.air_quality);

         lightData.push(item.data.light_intensity);
         timestampsData.push(item.timestamp);
      });

      setTemperatureData(tempData);
      setHumidityData(humidityData);
      // setVibrationData(vibrationData);

      setAccelerationXData(accelerationXData);
      setAccelerationYData(accelerationYData);
      setAccelerationZData(accelerationZData);

      calculateAcceleration();

      setGyroscopeXData(gyroscopeXData);
      setGyroscopeYData(gyroscopeYData);
      setGyroscopeZData(gyroscopeZData);

      setAirQualityData(airQualityData);

      setLightData(lightData);
      setTimestamps(timestampsData);

      console.log("TEMP: ", tempData);
      console.log("HUMIDITY: ", humidityData);
      // console.log("VIBRATION: ", vibrationData);
      console.log("LIGHT: ", lightData);
      console.log("TIMESTAMPS: ", timestampsData);
   };

   useEffect(() => {
      // getChartData();
      getRealChartData();
   }, []);

   useEffect(() => {
      // getChartData();
      getRealChartData();
   }, [
      temperatureData,
      humidityData,
      gyroscopeXData,
      gyroscopeYData,
      gyroscopeZData,
      accelerationXData,
      accelerationYData,
      accelerationZData,
      lightData,
      timestamps,
   ]);

   return (
      <div className="flex min-h-screen flex-col items-center justify-center">
         <div className={" h-1/5 w-full"}>
            <h1 className="text-center text-3xl font-bold text-teal-600 leading-8 p-4 bg-slate-300">
               {/* Food Condition Monitoring Dashboard */}
               Food Quality Metrics Overview
            </h1>
         </div>
         <div>
            <button
               className="text-center text-lg font-bold my-4 py-2 px-8 bg-teal-600 rounded-lg"
               onClick={getRealChartData}
            >
               Get Data
            </button>
         </div>
         <div
            id="charts-section"
            className="flex flex-col 2xl:flex-row gap-16 text-white"
         >
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={""}
                     options={temperatureOptions}
                     series={temperatureOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={""}
                     options={humidityOptions}
                     series={humidityOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={""}
                     options={gyroscopeOptions}
                     series={gyroscopeOptions.series}
                  />
               </div>
            </div>
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={""}
                     options={vibrationOptions}
                     series={vibrationOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={""}
                     options={lightOptions}
                     series={lightOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={""}
                     options={airQualityOptions}
                     series={airQualityOptions.series}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
