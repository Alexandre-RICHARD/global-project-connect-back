import {dbRequestExecuter} from "./../database";

export const worktimeModel = {
    "getAllUsersData": async () => {
        try {
            const results = await dbRequestExecuter("SELECT * FROM user_data");
            return results;
        } catch (err) {
            console.trace(err);
        }
        return null;
    },
};


// export const getAllUsers = () => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT * FROM userdata";

//         db.query(query, (err, results) => {
//             if (err) {
//                 console.error("Erreur :", err);
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };


// const db = require("../database.js");

// // Notre fichier qui est appelé par le account
// controller chargé de faire les requêtes liées
// const accountHandler = {
//     async getOneAccount (mail) {
//         const sql = `
//             SELECT * FROM userdata WHERE mail = $1
//         `;

//         const parameters = [mail];

//         const {rows} = await db.query(sql, parameters);
//         return rows;
//     },

//     async registerNewUser (nickname, mail, password) {
//         const sql = `
//         INSERT INTO
//             userdata
//             (
//                 nickname,
//                 mail,
//                 password_hashed
//             )
//             VALUES
//             (
//                 $1,
//                 $2,
//                 $3
//             )
//             RETURNING nickname, mail;
//         `;
//         const parameters = [
//             nickname,
//             mail,
//             password
//         ];
//         const {rows} = await db.query(sql, parameters);
//         return rows;
//     },

//     async changmail (id, mail) {
//         const sql = `
//         UPDATE userdata SET mail = $2 WHERE id = $1
//         RETURNING nickname, mail;
//         `;
//         const parameters = [
//             id,
//             mail
//         ];
//         const {rows} = await db.query(sql, parameters);
//         return rows;
//     },

//     async changePassword (id, password) {
//         const sql = `
//         UPDATE userdata SET password_hashed = $2 WHERE id = $1
//         RETURNING nickname, mail;
//         `;
//         const parameters = [
//             id,
//             password
//         ];
//         const {rows} = await db.query(sql, parameters);
//         return rows;
//     },

//     async deleteAccount (mail) {
//         const sql = `
//             DELETE FROM userdata WHERE mail = $1
//         `;
//         const parameters = [mail];
//         const {rows} = await db.query(sql, parameters);
//         return rows;
//     },
// };

// module.exports = accountHandler;
