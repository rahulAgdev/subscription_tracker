import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI){
    throw new Error('DB_URI is not defined');
}    

const connectToDatabase = async () => {
    await mongoose.connect(DB_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log("Error connect to db", err);
        process.exit(1);
    })
}

export default connectToDatabase;