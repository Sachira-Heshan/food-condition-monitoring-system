import mongoose from "mongoose";

export async function connect () {
    try {
        console.log('Connecting to database');
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('Successfully connected to database');
        })

        // listen to event called error
        connection.on('error', (error) => {
            console.error('Error connecting to database. Please check the connection string');
            console.error(error);
            process.exit(1);
        })
    } catch (error) {
        console.error('Error connecting to database');
        console.error(error);
    }
}