import mysql from "mysql";

export const db = mysql.createConnection({
    "host": "127.0.0.1",
    "user": "root",
    "password": "au4uqbf11",
    "database": "PORTFOLIO",
});

db.connect((err: Error | null) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connecté à la base de données MariaDB");
    }
});
