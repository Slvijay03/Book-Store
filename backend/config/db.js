import mongoose from "mongoose";

export const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};