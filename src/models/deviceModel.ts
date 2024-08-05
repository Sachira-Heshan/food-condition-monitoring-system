import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    device_ssid: {
        type: String,
    },
    device_password: {
        type: String,
    },
});

const Device = mongoose.models.devices || mongoose.model("devices", deviceSchema)

export default Device;