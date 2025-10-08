import { connect } from "mongoose";
import config from "./config.js";

export const initMongoDB = async () => {
    try {
        await connect(config.MONGO_URL);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error?.message || error);
        throw error;
    }
};
