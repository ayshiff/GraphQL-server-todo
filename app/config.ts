import mongoose from "mongoose";

// Used to prevent issues with env variables
import dotenv from "dotenv";
dotenv.config();

const MONGO_PORT: any = process.env.MONGO_PORT;
const MONGO_HOST: any = process.env.MONGO_HOST;
const MONGO_DB: any = process.env.MONGO_DB;

const MONGO_URI: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

/**
 * Here we try to connect to the mongodb instance
 * If we can't we log the error
 */
try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true });
} catch (error) {
  console.warn("An error occured: ", error);
}

mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at ${MONGO_URI}`)
);
