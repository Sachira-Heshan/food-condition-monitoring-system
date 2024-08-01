import mongoose from "mongoose";

const environmentConditionSchema = new mongoose.Schema({
    temperature: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    light: {
        type: Number,
    },
    vibration: {
        type: Number,
    },
    timestamp: {
        type: Date,  
    },
    device_id: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const EnvironmentConditions =
   mongoose.models.EnvironmentConditions ||
   mongoose.model("EnvironmentConditions", environmentConditionSchema);

export default EnvironmentConditions;