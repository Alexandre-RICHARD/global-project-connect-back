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
    "changeMail": async (id: number, mail: string) => {
        console.log("lol");
        const request = `
        UPDATE user_data SET mail = ? WHERE Id_user_data = ?;
        SELECT nickname, mail FROM user_data WHERE Id_user_data = ?;
        `;
        const parameters = [
            mail,
            id,
            id
        ];

        console.log(await db(request, parameters));
        const result = await db(request, parameters);
        return result;
    },
    "changePassword": async (id: number, password: string) => {
        const request = `
        UPDATE user_data SET password_hashed = ? WHERE Id_user_data = ?;
        `;
        const parameters = [
            id,
            password
        ];
        await db(request, parameters);

        const getRequest = `
        SELECT nickname, mail FROM user_data WHERE Id_user_data = ?;
        `;
        const getParameters = [id];
        const result = await db(getRequest, getParameters);
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
