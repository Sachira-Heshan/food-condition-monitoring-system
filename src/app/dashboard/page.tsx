'use client';
import React, { useEffect, useState } from "react";
import LineChart from "../components/line-chart";
import axios from "axios";

interface Data {
   temperature: number;
   humidity: number;
   vibration: number;
   light: number;
   device_id: string;
   timestamp: string;
   _id: string;
}

export default function DashboardPage () {
   const [rawData, setRawData] = useState([]);

   const [temperatureData, setTemperatureData] = useState<Array<number>>([]);
   const [humidityData, setHumidityData] = useState<Array<number>>([]);
   const [vibrationData, setVibrationData] = useState<Array<number>>([]);
   const [lightData, setLightData] = useState<Array<number>>([]);
   const [timestamps, setTimestamps] = useState<Array<string>>([]);
   
   var temperatureOptions = {
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
      colors: ["#77B6EA"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: true,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Temperature Variation",
         align: "center",
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
            text: "Temperature",
         },
         min: temperatureData.length > 0 ? Math.min(...temperatureData) - 5 : 0,
         max:
            temperatureData.length > 0 ? Math.max(...temperatureData) + 5 : 100,
      },
   };

   var humidityOptions = {
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
         enabled: true,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Humidity Variation",
         align: "center",
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
            text: "Humidity",
         },
         min: humidityData.length > 0 ? Math.min(...humidityData) - 5 : 0,
         max:
            humidityData.length > 0 ? Math.max(...humidityData) + 5 : 100,
      },
   };

   var vibrationOptions = {
      series: [
         {
            data: vibrationData,
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
      colors: ["#bf1900"], //#11c700       //#bf1900        //"#fcba03"
      dataLabels: {
         enabled: true,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Vibration Variation",
         align: "center",
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
         },
         min: vibrationData.length > 0 ? Math.min(...vibrationData) - 5 : 0,
         max:
            vibrationData.length > 0 ? Math.max(...vibrationData) + 5 : 100,
      },
   };

   var lightOptions = {
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
         enabled: true,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Light Intensity Variation",
         align: "center",
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
            text: "Light Intensity",
         },
         min: lightData.length > 0 ? Math.min(...lightData) - 5 : 0,
         max:
            lightData.length > 0 ? Math.max(...lightData) + 5 : 100,
      },
   };

   const getChartData = async () => {
      try {
         const response = await axios.get("/api/dashboard");
         setRawData(response.data.data);
         processData(response.data.data);
         console.log(response.data.data);
      } catch (error) {
         console.error("Error getting data from the server!", error);
      }
   };

   const processData = (data: Array<Data>) => {
      const tempData: Array<number> = [];
      const humidityData: Array<number> = [];
      const vibrationData: Array<number> = [];
      const lightData: Array<number> = [];
      const timestampsData: Array<string> = [];

      data.forEach((item: Data) => {
         tempData.push(item.temperature);
         humidityData.push(item.humidity);
         vibrationData.push(item.vibration);
         lightData.push(item.light);
         timestampsData.push(item.timestamp);
      });

      setTemperatureData(tempData);
      setHumidityData(humidityData);
      setVibrationData(vibrationData);
      setLightData(lightData);
      setTimestamps(timestampsData);

      console.log("TEMP: ", tempData)
      console.log("HUMIDITY: ", humidityData)
      console.log("VIBRATION: ", vibrationData)
      console.log("LIGHT: ", lightData)
      console.log("TIMESTAMPS: ", timestampsData)
   };

   useEffect(() => {
      getChartData();
   }, [])

   useEffect(() => {
      // getChartData();
   }, [temperatureData, humidityData, vibrationData, lightData, timestamps])

   return (
      <div className="flex min-h-screen flex-col items-center justify-center">
         <h1 className="text-center text-xl font-bold leading-8 p-4 m-2 px-8 rounded-lg bg-red-700">
            Food Condition Monitoring Dashboard
         </h1>
         <div id="charts-section" className="flex flex-row gap-16">
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={"Temparature"}
                     options={temperatureOptions}
                     series={temperatureOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={"Humidity"}
                     options={humidityOptions}
                     series={humidityOptions.series}
                  />
               </div>
            </div>
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={"Vibration"}
                     options={vibrationOptions}
                     series={vibrationOptions.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={"Light"}
                     options={lightOptions}
                     series={lightOptions.series}
                  />
               </div>
            </div>
         </div>
         <div>
            <button
               className="text-center text-lg font-bold my-4 py-2 px-8 bg-blue-700 rounded-lg"
               onClick={getChartData}
            >
               Get Data
            </button>
         </div>
      </div>
   );
};
