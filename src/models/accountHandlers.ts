import {dbRequestExecuter as db} from "./../database";

export const accountHandler = {
    "getOneAccountWithMail": async (mail: string) => {
        const request = `
            SELECT * FROM user_data WHERE mail = ?
        `;
        const parameters = [mail];

        const result = await db(request, parameters);
        return result;
    },
    "getOneAccountWithNickname": async (nickname: string) => {
        const request = `
            SELECT * FROM user_data WHERE nickname = ?
        `;
        const parameters = [nickname];

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
        const updateRequest = `
        UPDATE user_data SET mail = ? WHERE Id_user_data = ?
        `;
        const selectRequest = `
        SELECT nickname, mail FROM user_data WHERE Id_user_data = ?
        `;

        const updateParameters = [
            mail,
            id
        ];
        const selectParameters = [id];

        await db(updateRequest, updateParameters);
        const result = await db(selectRequest, selectParameters);
        return result;
    },
    "changePassword": async (id: number, password: string) => {
        const updateRequest = `
        UPDATE user_data SET password_hashed = ? WHERE Id_user_data = ?
        `;
        const selectRequest = `
        SELECT nickname, mail FROM user_data WHERE Id_user_data = ?
        `;

        const updateParameters = [
            password,
            id
        ];
        const selectParameters = [id];

        await db(updateRequest, updateParameters);
        const result = await db(selectRequest, selectParameters);
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
