import mongoose from "mongoose";

const environmentAttributesSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    light: {
        type: Number,
        required: true
    },
    vibration: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true   
    },
    // deviceId: {}
})

const EnvironmentAttributes = mongoose.models.EnvironmentAttributes || mongoose.model("EnvironmentAttributes", environmentAttributesSchema);

export default EnvironmentAttributes;