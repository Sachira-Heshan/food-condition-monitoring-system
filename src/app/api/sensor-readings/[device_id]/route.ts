import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import SensorsReadings from "@/models/sensorsReadingModel";

connect();

export async function GET(request: NextRequest, { params } : { params: { device_id: string } }) {
    const { device_id } = params;

   try {
      const sensorsReadings = await SensorsReadings.find({ device_id: device_id });
      if (sensorsReadings.length > 0) {
         console.log(
            "Successfully got the sensors readings data for the dashboard!"
         );
         return NextResponse.json(
            {
               sensor_readings: sensorsReadings,
               message:
                  "Successfully got the sensors readings data for the dashboard!",
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
            message: "Something went wrong when getting the data for the dashboard!",
            error: true,
         },
         { status: 500 }
      );
   }
}