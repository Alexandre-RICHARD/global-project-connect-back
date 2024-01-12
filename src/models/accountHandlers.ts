import {dbRequestExecuter as db} from "./../database";

export const accountHandler = {
    "getOneAccount": async (mail: string) => {
        const request = `
            SELECT * FROM user_data WHERE mail = ?
        `;
        const parameters = [mail];

        const result = await db(request, parameters);
        return result;
    },
    "registerNewUser": async (
        nickname: string,
        mail: string,
        password: string
    ) => {
        const request = `
        INSERT INTO
            user_data
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
        const result = await db(request, parameters);
        return result;
    },
    "changmail": async (id: number, mail: string) => {
        const request = `
        UPDATE user_data SET mail = ? WHERE id = ?
        RETURNING nickname, mail;
        `;
        const parameters = [
            id,
            mail
        ];

        const result = await db(request, parameters);
        return result;
    },
    "changePassword": async (id: number, password: string) => {
        const request = `
        UPDATE user_data SET password_hashed = ? WHERE id = ?
        RETURNING nickname, mail;
        `;
        const parameters = [
            id,
            password
        ];

        const result = await db(request, parameters);
        return result;
    },
    "deleteAccount": async (mail: string) => {
        const request = `
            DELETE FROM user_data WHERE mail = ?
        `;
        const parameters = [mail];

        const result = await db(request, parameters);
        return result;
    },
};
