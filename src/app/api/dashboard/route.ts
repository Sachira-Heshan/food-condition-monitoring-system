import {connect} from "@/config/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import EnvironmentAttributes from "@/models/environmentAttributesModel"

connect();

export async function GET(request: NextRequest) {
    try {
        const environmentAttributes = await EnvironmentAttributes.find().sort({timestamp: -1}).limit(1);
        if(environmentAttributes){
            console.log("Successfully got the environment attributes data for the dashboard!")
            return NextResponse.json(environmentAttributes, {status: 200})
        }
        console.log("No data found for the dashboard!")
        return NextResponse.json({message: "No data found for the dashboard!"}, {status: 404})
    } catch (error: any) {
        console.log("Something went wrong when getting the data for the dashboard! ", error)
        return NextResponse.json({message: "Something went wrong when getting the data for the dashboard!"}, {status: 500}) 
    }
}