// Import and config of dotenv to use environment variable
import dotenv from "dotenv";
dotenv.config();
// Import of express and its type
import express, {Express} from "express";
// Using of cors for request origin handling
import cors from "cors";
import router from "./router";

const PORT = process.env.LOCAL_PORT;

const corsOptions = {
    "origin": process.env.CORS_ORIGIN?.split(" "),
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
};

// Create app server with express
const app: Express = express();
app.use(cors(corsOptions));
// Using json for request response
app.use(express.json());
app.use(router);

// Export of starting function
export const start = () => app.listen(PORT, (): void => {
    // eslint-disable-next-line no-console
    console.log(`Server works on http://localhost:${PORT}`);
});
