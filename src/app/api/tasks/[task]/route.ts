import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";

connect();

export async function GET(
   request: NextRequest,
   { params }: { params: { task: string } }
) {
   const { task } = params;

   try {
      const task_data = await Task.findOne({ task_id: task });
      if (!task_data) {
         return NextResponse.json(
            { message: "No tasks found!", error: false },
            { status: 404 }
         );
      }
      return NextResponse.json(
         {
            task_data,
            message: "Successfully got the tasks!",
            error: false,
         },
         { status: 200 }
      );
   } catch (error: any) {
      console.log("Something went wrong when getting the tasks! ", error);
      return NextResponse.json(
         {
            message: "Something went wrong when getting the tasks!",
            error: true,
         },
         { status: 500 }
      );
   }
}
