import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import SensorsReadings from "@/models/sensorsReadingModel";

connect();

export async function GET(request: NextRequest) {
   try {
      const sensorReadings = await SensorsReadings.find({});
      if (sensorReadings.length > 0) {
         console.log("Successfully got the sensor readings for the dashboard!");
         return NextResponse.json(
            {
               sensor_readings: sensorReadings,
               message:
                  "Successfully got the sensor readings for the dashboard!",
               error: false,
            },
            { status: 200 }
         );
      }
      console.log("No data found for the dashboard!");
      return NextResponse.json(
         { message: "No data found for the dashboard!", error: false },
         { status: 404 }
      );
   } catch (error: any) {
      console.log(
         "Something went wrong when getting the data for the dashboard! ",
         error
      );
      return NextResponse.json(
         {
            message:
               "Something went wrong when getting the data for the dashboard!",
            error: true,
         },
         { status: 500 }
      );
   }
}

export async function POST(request: NextRequest) {
   const reqBody = await request.json();
   console.log(reqBody);

   try {
      const sensorReadings = new SensorsReadings({
         ...reqBody,
         timestamp: new Date(),
      });
      const savedData = await sensorReadings.save();
      console.log(
         "Successfully saved the sensor readings data!",
         savedData
      );
      return NextResponse.json(
         {
            saved_data: savedData,
            message: "Successfully saved the sensor readings data!",
            error: false,
         },
         { status: 201 }
      );
   } catch (error: any) {
      console.log(
         "Something went wrong when saving the data for the dashboard! ",
         error
      );
      return NextResponse.json(
         {
            message:
               "Something went wrong when saving the data for the dashboard!",
            error: true,
         },
         { status: 500 }
      );
   }
}
