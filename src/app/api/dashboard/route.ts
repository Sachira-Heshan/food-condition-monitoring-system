import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import EnvironmentConditions from "@/models/environmentConditionsModel";

connect();

export async function GET(request: NextRequest) {
   try {
      const environmentConditions = await EnvironmentConditions.find({});
      if (environmentConditions.length > 0) {
         console.log(
            "Successfully got the environment conditions data for the dashboard!"
         );
         return NextResponse.json(
            {
               data: environmentConditions,
               message:
                  "Successfully got the environment conditions data for the dashboard!",
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
      const environmentConditions = new EnvironmentConditions({
         temperature: reqBody.temperature,
         humidity: reqBody.humidity,
         light: reqBody.light,
         vibration: reqBody.vibration,
         timestamp: new Date(),
         device_id: reqBody.device_id,
      });
      const savedData = await environmentConditions.save();
      console.log("Successfully saved the environment conditions data!", savedData);
      return NextResponse.json(
         {
            data: savedData,
            message: "Successfully saved the environment conditions data!",
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
            message: "Something went wrong when saving the data for the dashboard!",
            error: true,
         },
         { status: 500 }
      );
   }
}
