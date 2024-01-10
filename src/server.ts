// Import of express and its type
import express, {Express} from "express";
// Using of cors for request origin handling
import cors from "cors";
import router from "./router";
// Import and config of dotenv to use environment variable
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.LOCAL_PORT;

// Create app server with express
const app: Express = express();
app.use(cors());
// Using json for request response
app.use(express.json());
app.use(router);

// Export of starting function
export const start = () => app.listen(PORT, (): void => {
    console.log(`Server works on http://localhost:${PORT}`);
});
