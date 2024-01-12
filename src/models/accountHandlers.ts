import {dbRequestExecuter as db} from "./../database";

export const accountHandler = {
    "getAllUsersData": async () => {
        const request = `
            SELECT * FROM user_data
        `;

        try {
            const results = await db(request);
            return results;
        } catch (err) {
            console.trace(err);
        }
        return null;
    },
    "getOneAccount": async (mail: string) => {
        const request = `
            SELECT * FROM userdata WHERE mail = ?
        `;
        const parameters = [mail];

        const {rows} = await db(request, parameters);
        return rows;
    },
    "registerNewUser": async (
        nickname: string,
        mail: string,
        password: string
    ) => {
        const request = `
        INSERT INTO
            userdata
            (
                nickname,
                mail,
                password_hashed
            )
            VALUES
            (
                ?,
                ?,
                ?
            )
            RETURNING nickname, mail;
        `;
        const parameters = [
            nickname,
            mail,
            password
        ];
        const {rows} = await db(request, parameters);
        return rows;
    },
    "changmail": async (id: number, mail: string) => {
        const request = `
        UPDATE userdata SET mail = ? WHERE id = ?
        RETURNING nickname, mail;
        `;
        const parameters = [
            id,
            mail
        ];

        const {rows} = await db(request, parameters);
        return rows;
    },
    "changePassword": async (id: number, password: string) => {
        const request = `
        UPDATE userdata SET password_hashed = ? WHERE id = ?
        RETURNING nickname, mail;
        `;
        const parameters = [
            id,
            password
        ];

        const {rows} = await db(request, parameters);
        return rows;
    },
    "deleteAccount": async (mail: string) => {
        const request = `
            DELETE FROM userdata WHERE mail = ?
        `;
        const parameters = [mail];

        const {rows} = await db(request, parameters);
        return rows;
    },
};
