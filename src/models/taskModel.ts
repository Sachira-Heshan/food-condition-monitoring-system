import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        required: true,
    },
    food_category: {
        type: String,
        required: true,
    },
    device_ssid: {
        type: String,
    },
    driver_name: {
        type: String,
    },
    vehicle_id: {
        type: String,
    },
    task_status: {
        type: String,
    },
    task_start_time: {
        type: Date,
    },
    task_end_time: {
        type: Date,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
})

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema)

export default Task;