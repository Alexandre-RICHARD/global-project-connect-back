import mariadb from "mariadb";
import {errorSaver} from "./utilities/errorSaver";

let port = 3306;

if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT.toString());
}

const pool = mariadb.createPool({
    "host": process.env.DB_HOST,
    "port": port,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
});

export const dbRequestExecuter = async (
    query: string,
    params: unknown[] = []
) => {
    let db = null;
    try {
        db = await pool.getConnection();
        const result = await db.query(query, params);
        return result;
    } catch (error) {
        const errorF = error as Error;
        await errorSaver("database-use-failed", JSON.stringify(errorF.stack));
        return ["database-error"];
    } finally {
        if (db) db.release();
    }
};

module.exports = {dbRequestExecuter};
