import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";

connect();

export async function GET(request: NextRequest) {
   try {
      const tasks = await Task.find({});
      if (tasks.length > 0) {
         console.log("Successfully got the tasks data");
         return NextResponse.json(
            {
               tasks_data: tasks,
               message: "Successfully got the tasks data",
               error: false,
            },
            { status: 200 }
         );
      }
      console.log("No data found");
      return NextResponse.json(
         { message: "No data found", error: false },
         { status: 404 }
      );
   } catch (error: any) {
      console.log(
         "Something went wrong when getting the data ",
         error
      );
      return NextResponse.json(
         {
            message: "Something went wrong when getting the data",
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
      const task = new Task({
         task_id: reqBody.task_id,
         food_category: reqBody.food_category,
         device_ssid: reqBody.device_ssid,
         driver_name: reqBody.driver_name,
         vehicle_id: reqBody.vehicle_id,
         task_status: reqBody.task_status,
         task_start_time: reqBody.task_start_time,
         task_end_time: reqBody.task_end_time,
         from: reqBody.from,
         to: reqBody.to,
      });
      const savedData = await task.save();
      console.log("Successfully saved the task data!", savedData);
      return NextResponse.json(
         {
            saved_task: savedData,
            message: "Successfully saved the task data!",
            error: false,
         },
         { status: 200 }
      );
   } catch (error: any) {
      console.log(
         "Something went wrong when saving the data ",
         error
      );
      return NextResponse.json(
         {
            message: "Something went wrong when saving the data",
            error: true,
         },
         { status: 500 }
      );
   }
}