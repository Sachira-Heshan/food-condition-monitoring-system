'use client';
import React from "react";
import LineChart from "@/components/chart/lineChart";
import axios from "axios";

export default function DashboardPage () {
   var options = {
      series: [
         {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33],
         },
         {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13],
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
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
         enabled: true,
      },
      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Average High & Low Temperature",
         align: "left",
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
         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
         title: {
            text: "Month",
         },
      },
      yaxis: {
         title: {
            text: "Temperature",
         },
         min: 5,
         max: 40,
      },
      legend: {
         position: "top",
         horizontalAlign: "right",
         floating: true,
         offsetY: -25,
         offsetX: -5,
      },
   };

   return (
      <div className="flex min-h-screen flex-col items-center justify-center">
         <h1 className="text-center text-xl font-bold leading-8 p-4 m-2 px-8 rounded-lg bg-red-700">
            Condition Monitoring Dashboard
         </h1>
         <div id="charts-section" className="flex flex-row gap-16">
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={"Temparature"}
                     options={options}
                     series={options.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={"Humidity"}
                     options={options}
                     series={options.series}
                  />
               </div>
            </div>
            <div className="flex flex-col gap-8">
               <div id="chart">
                  <LineChart
                     title={"Vibration"}
                     options={options}
                     series={options.series}
                  />
               </div>
               <div id="chart">
                  <LineChart
                     title={"Light"}
                     options={options}
                     series={options.series}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
