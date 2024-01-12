/* eslint-disable max-lines */

import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {accountHandler} from "../models/accountHandlers";
import {regexTest} from "./../utilities/regexTest";

const salt = bcrypt.genSaltSync(10);

export const accountController = {
    "getUsers": async (_req: Request, res: Response) => {
        try {
            const response = await accountHandler.getAllUsersData();
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            res.status(200).json(error);
        }
    },
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

        // ! TODO
        if (registerResponse.length === 0) {
            try {
                if (!(await accountHandler.getOneAccount(mail))[0]) {
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
                    res.status(200).json(["account-already-exist"]);
                }
            } catch (error) {
                res.status(500).json(["server-error"]);
            }
        } else {
            res.status(200).json(registerResponse);
        }
    },
    "connection": async (_req: Request, res: Response) => {
        const {mail, password} = _req.body;

        // ! TODO
        try {
            const tryFindAccount = (
                await accountHandler.getOneAccount(mail)
            )[0];
            if (
                tryFindAccount &&
                bcrypt.compareSync(password, tryFindAccount.password_hashed) ===
                    true
            ) {
                const result = {
                    "nickname": tryFindAccount.nickname,
                    "mail": tryFindAccount.mail,
                };
                res.status(200).json([
                    "login-success",
                    result
                ]);
            } else {
                res.status(200).json(["login-failed"]);
            }
        } catch (error) {
            res.status(500).json(["server-error"]);
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

        // ! TODO
        if (newMailResponse.length === 0) {
            try {
                const findGoodAccount = (
                    await accountHandler.getOneAccount(currentMail)
                )[0];
                if (findGoodAccount) {
                    if (
                        bcrypt.compareSync(
                            password,
                            findGoodAccount.password_hashed
                        )
                    ) {
                        try {
                            if (
                                !(
                                    await accountHandler.getOneAccount(newMail)
                                )[0]
                            ) {
                                const result = (
                                    await accountHandler.changmail(
                                        findGoodAccount.id,
                                        newMail
                                    )
                                )[0];
                                res.status(200).json([
                                    "change-mail-success",
                                    result
                                ]);
                            } else {
                                res.status(200).json(["account-already-exist"]);
                            }
                        } catch (error) {
                            res.status(500).json(["server-error"]);
                        }
                    } else {
                        res.status(200).json(["wrong-password"]);
                    }
                } else {
                    res.status(200).json(["mail-error"]);
                }
            } catch (error) {
                res.status(500).json(["server-error"]);
            }
        } else {
            res.status(200).json(newMailResponse);
        }
    },
    "changePassword": async (_req: Request, res: Response) => {
        const newPasswordResponse: string[] = [];
        const {
            mail, oldPassword, newPassword, newPasswordConfirmation,
        } =
            _req.body;

        if (regexTest.testPassword(newPassword)) {
            newPasswordResponse.push("format-password-two");
        }

        if (
            regexTest.testPasswordConfirmation(
                newPassword,
                newPasswordConfirmation
            )
        ) {
            newPasswordResponse.push("match-password");
        }

        // ! TODO
        if (newPasswordResponse.length === 0) {
            try {
                const findGoodAccount = (
                    await accountHandler.getOneAccount(mail)
                )[0];
                if (findGoodAccount) {
                    if (
                        bcrypt.compareSync(
                            oldPassword,
                            findGoodAccount.password_hashed
                        )
                    ) {
                        try {
                            const result = (
                                await accountHandler.changePassword(
                                    findGoodAccount.id,
                                    await bcrypt.hash(newPassword, salt)
                                )
                            )[0];
                            res.status(200).json([
                                "change-password-success",
                                result
                            ]);
                        } catch (error) {
                            res.status(500).json(["server-error"]);
                        }
                    } else {
                        res.status(200).json(["wrong-password"]);
                    }
                } else {
                    res.status(200).json(["mail-error"]);
                }
            } catch (error) {
                res.status(500).json(["server-error"]);
            }
        } else {
            res.status(200).json(newPasswordResponse);
        }
    },
    "deleteAccount": async (_req: Request, res: Response) => {
        const {mail, deleteAccountPassword} = _req.body;

        // ! TODO
        try {
            const findGoodAccount = (
                await accountHandler.getOneAccount(mail)
            )[0];
            if (findGoodAccount) {
                if (
                    bcrypt.compareSync(
                        deleteAccountPassword,
                        findGoodAccount.password_hashed
                    )
                ) {
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
        } catch (error) {
            res.status(500).json(["server-error"]);
        }
    },
};
