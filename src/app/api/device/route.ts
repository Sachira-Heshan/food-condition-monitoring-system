import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Device from "@/models/deviceModel";

connect();

export async function GET(request: NextRequest) {
   try {
      const devices = await Device.find({});
      if (devices.length > 0) {
         console.log("Successfully got the devices data for the dashboard!");
         return NextResponse.json(
            {
               data: devices,
               message: "Successfully got the devices data for the dashboard!",
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

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    console.log(reqBody)

   try {
      const device = new Device({
         food_category: reqBody.food_category,
         driver_name: reqBody.driver_name,
         vehicle_id: reqBody.vehicle_id,
      });
      const savedData = await device.save();
      console.log("Successfully saved the device data!", savedData);
      return NextResponse.json(
         {
            data: savedData,
            message: "Successfully saved the device data!",
            error: false,
         },
         { status: 200 }
      );
   } catch (error: any) {
      console.log("Something went wrong when saving the device data! ", error);
      return NextResponse.json(
         {
            message: "Something went wrong when saving the device data!",
            error: true,
         },
         { status: 500 }
      );
   }
}