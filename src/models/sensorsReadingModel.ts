import mongoose from "mongoose";

const sensorsReadingSchema = new mongoose.Schema({
   data: {
      temperature: {
         type: Number,
      },
      relative_humidity: {
         type: Number,
      },
      light_intensity: {
         type: Number,
      },
      vibration: {
         type: Number,
      },
      air_quality: {
         type: Number,
      },
      mpu6050: {
         acc_x: {
            type: Number,
         },
         acc_y: {
            type: Number,
         },
         acc_z: {
            type: Number,
         },
         gyro_x: {
            type: Number,
         },
         gyro_y: {
            type: Number,
         },
         gyro_z: {
            type: Number,
         },
      },
   },
   timestamp: {
      type: Date,
   },
   device_id: {
      type: mongoose.Schema.Types.ObjectId,
   },
});

const SensorsReadings =
   mongoose.models.SensorsReadings ||
   mongoose.model("SensorsReadings", sensorsReadingSchema);

export default SensorsReadings;
