import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    food_category: {
        type: String,
        required: true,
    },
    driver_name: {
        type: String,
        required: true,
    },
    vehicle_id: {
        type: String,
        required: true,
    },
});

const Device = mongoose.models.devices || mongoose.model("devices", deviceSchema)

export default Device;