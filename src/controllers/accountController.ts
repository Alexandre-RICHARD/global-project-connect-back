/* eslint-disable max-lines */

import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {accountHandler} from "../models/accountHandlers";
import {regexTest} from "./../utilities/regexTest";

const salt = bcrypt.genSaltSync(10);

const getAccountWithMail = async (mail: string) => {
    return (await accountHandler.getOneAccountWithMail(mail))[0];
};

const getAccountWithNickname = async (nickname: string) => {
    return (await accountHandler.getOneAccountWithNickname(nickname))[0];
};

export const accountController = {
    "registration": async (_req: Request, res: Response) => {
        const registerResponse: string[] = [];
        const {
            mail, nickname, password, passwordConfirmation,
        } = _req.body;

        if (regexTest.testMail(mail)) {
            registerResponse.push("format-mail");
        }

        if (regexTest.testNickname(nickname)) {
            registerResponse.push("format-nickname");
        }

        if (regexTest.testPassword(password)) {
            registerResponse.push("format-password");
        }

        if (
            regexTest.testPasswordConfirmation(password, passwordConfirmation)
        ) {
            registerResponse.push("match-password");
        }

        if (registerResponse.length === 0) {
            let accountM = null;
            let accountN = null;
            try {
                accountM = await getAccountWithMail(mail);
                accountN = await getAccountWithNickname(nickname);
            } catch (error) {
                res.status(500).json(["server-error"]);
                return;
            }

            if (!accountM) {
                if (!accountN) {
                    const hashedPassword = await bcrypt.hash(password, salt);
                    try {
                        const result = (
                            await accountHandler.registerNewUser(
                                nickname,
                                mail,
                                hashedPassword
                            )
                        )[0];
                        res.status(201).json([
                            "register-success",
                            result
                        ]);
                    } catch (error) {
                        res.status(500).json(["server-error"]);
                    }
                } else {
                    res.status(200).json(["nickname-already-existing"]);
                }
            } else {
                res.status(200).json(["account-already-exist"]);
            }
        } else {
            res.status(200).json(registerResponse);
        }
    },
    "connection": async (_req: Request, res: Response) => {
        const {mail, password} = _req.body;

        let account = null;
        try {
            account = await getAccountWithMail(mail);
        } catch (error) {
            res.status(500).json(["server-error"]);
            return;
        }

        if (account && bcrypt.compareSync(password, account.password_hashed)) {
            const result = {
                "nickname": account.nickname,
                "mail": account.mail,
            };
            res.status(200).json([
                "login-success",
                result
            ]);
        } else {
            res.status(200).json(["login-failed"]);
        }
    },
    "changeMail": async (_req: Request, res: Response) => {
        const newMailResponse: string[] = [];
        const {
            currentMail, newMail, newMailConfirmation, password,
        } = _req.body;

        if (regexTest.testMail(newMail)) {
            newMailResponse.push("format-mail");
        }

        if (regexTest.testMailConfirmation(newMail, newMailConfirmation)) {
            newMailResponse.push("match-mail");
        }

        let account = null;
        if (newMailResponse.length === 0) {
            try {
                account = await getAccountWithMail(currentMail);
            } catch (error) {
                res.status(500).json(["server-error"]);
                return;
            }
        } else {
            res.status(200).json(newMailResponse);
            return;
        }

        const changeMail = async (accountId: number) => {
            const newMailAccount = await getAccountWithMail(newMail);
            if (!newMailAccount) {
                const result = await accountHandler.changeMail(
                    accountId,
                    newMail
                );
                res.status(200).json([
                    "change-mail-success",
                    result
                ]);
            } else {
                res.status(200).json(["account-already-exist"]);
            }
        };

        if (account) {
            if (bcrypt.compareSync(password, account.password_hashed)) {
                try {
                    await changeMail(account.Id_user_data);
                } catch (error) {
                    console.log(error);
                    res.status(500).json(["server-error"]);
                }
            } else {
                res.status(200).json(["wrong-password"]);
            }
        } else {
            res.status(200).json(["mail-error"]);
        }
    },
    "changePassword": async (_req: Request, res: Response) => {
        const newPasswordResponse: string[] = [];
        const {
            mail, oldPassword, newPassword, newPasswordConfirmation,
        } =
            _req.body;

        if (regexTest.testPassword(newPassword)) {
            newPasswordResponse.push("format-password-new");
        }

        if (
            regexTest.testPasswordConfirmation(
                newPassword,
                newPasswordConfirmation
            )
        ) {
            newPasswordResponse.push("match-password");
        }

        let account = null;
        if (newPasswordResponse.length === 0) {
            try {
                account = await getAccountWithMail(mail);
            } catch (error) {
                res.status(500).json(["server-error"]);
                return;
            }
        } else {
            res.status(200).json(newPasswordResponse);
            return;
        }

        const changePassword = async (accountId: number) => {
            const result = (
                await accountHandler.changePassword(
                    accountId,
                    await bcrypt.hash(newPassword, salt)
                )
            )[0];
            res.status(200).json([
                "change-password-success",
                result
            ]);
        };

        if (account) {
            if (bcrypt.compareSync(oldPassword, account.password_hashed)) {
                try {
                    changePassword(account.Id_user_data);
                } catch (error) {
                    res.status(500).json(["server-error"]);
                }
            } else {
                res.status(200).json(["wrong-password"]);
            }
        } else {
            res.status(200).json(["mail-error"]);
        }
    },
    "deleteAccount": async (_req: Request, res: Response) => {
        const {mail, password} = _req.body;

        let account = null;
        try {
            account = await getAccountWithMail(mail);
        } catch (error) {
            res.status(500).json(["server-error"]);
            return;
        }

        if (account) {
            if (bcrypt.compareSync(password, account.password_hashed)) {
                try {
                    await accountHandler.deleteAccount(mail);
                    res.status(200).json(["delete-account-success"]);
                } catch (error) {
                    res.status(500).json(["server-error"]);
                }
            } else {
                res.status(200).json(["wrong-password"]);
            }
        } else {
            res.status(200).json(["mail-error"]);
        }
    },
};
