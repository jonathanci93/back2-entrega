import "dotenv/config";

export default {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 8080,
    SECRET_KEY: process.env.SECRET_KEY || "devSecret",
    NODE_ENV: process.env.NODE_ENV || "development"
};
