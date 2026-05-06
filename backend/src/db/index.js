import mongoose from 'mongoose';

import { DB_NAME } from '../constant.js';

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB is successfully connected on :  ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error while connecting to DB",error)
    }
}

export default connectDB;