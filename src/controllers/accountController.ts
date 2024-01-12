/* eslint-disable max-depth */
/* eslint-disable max-lines */

import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {accountHandler} from "../models/accountHandlers";

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

        const regexTest = () => {
            if (!mail.match(/.+@.+\..+/gm)) {
                registerResponse.push("format-mail");
            }

            if (
                !(
                    !nickname.match(/[^0-9a-zA-Z-_]/gm) &&
                    nickname.length >= 3 &&
                    nickname.length <= 25
                )
            ) {
                registerResponse.push("format-nickname");
            }

            try {
                if (
                    !(
                        password.match(/([a-z])/g).join("").length >= 2 &&
                        password.match(/([A-Z])/g).join("").length >= 2 &&
                        password.match(/([0-9])/g).join("").length >= 2 &&
                        password
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !password.match(/([\s\b\n\t])/g) &&
                        password.length >= 8 &&
                        password.length <= 60
                    )
                ) {
                    registerResponse.push("format-password");
                }
            } catch {
                registerResponse.push("format-password");
            }

            if (password !== passwordConfirmation) {
                registerResponse.push("match-password");
            }
        };

        regexTest();

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
        const loginResponse: string[] = [];
        const {mail, password} = _req.body;

        const regexTest = () => {
            if (!mail.match(/.+@.+\..+/gm)) {
                loginResponse.push("format-mail");
            }

            try {
                if (
                    !(
                        password.match(/([a-z])/g).join("").length >= 2 &&
                        password.match(/([A-Z])/g).join("").length >= 2 &&
                        password.match(/([0-9])/g).join("").length >= 2 &&
                        password
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !password.match(/([\s\b\n\t])/g) &&
                        password.length >= 8 &&
                        password.length <= 60
                    )
                ) {
                    loginResponse.push("format-password");
                }
            } catch {
                loginResponse.push("format-password");
            }
        };

        regexTest();

        if (loginResponse.length === 0) {
            try {
                const tryFindAccount = (
                    await accountHandler.getOneAccount(mail)
                )[0];
                if (
                    tryFindAccount &&
                    bcrypt.compareSync(
                        password,
                        tryFindAccount.password_hashed
                    ) === true
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
        } else {
            res.status(200).json(loginResponse);
        }
    },
    "changeMail": async (_req: Request, res: Response) => {
        const newMailResponse: string[] = [];
        const {
            currentMail, newMail, newMailConfirmation, password,
        } = _req.body;

        const regexTest = () => {
            if (!newMail.match(/.+@.+\..+/gm)) {
                newMailResponse.push("format-mail");
            }

            if (newMail !== newMailConfirmation) {
                newMailResponse.push("match-mail");
            }

            try {
                if (
                    !(
                        password.match(/([a-z])/g).join("").length >= 2 &&
                        password.match(/([A-Z])/g).join("").length >= 2 &&
                        password.match(/([0-9])/g).join("").length >= 2 &&
                        password
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !password.match(/([\s\b\n\t])/g) &&
                        password.length >= 8 &&
                        password.length <= 60
                    )
                ) {
                    newMailResponse.push("format-password");
                }
            } catch {
                newMailResponse.push("format-password");
            }
        };

        regexTest();

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

        const regexTest = () => {
            try {
                if (
                    !(
                        oldPassword.match(/([a-z])/g).join("").length >= 2 &&
                        oldPassword.match(/([A-Z])/g).join("").length >= 2 &&
                        oldPassword.match(/([0-9])/g).join("").length >= 2 &&
                        oldPassword
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !oldPassword.match(/([\s\b\n\t])/g) &&
                        oldPassword.length >= 8 &&
                        oldPassword.length <= 60
                    )
                ) {
                    newPasswordResponse.push("format-password-one");
                }
            } catch {
                newPasswordResponse.push("format-password-one");
            }

            try {
                if (
                    !(
                        newPassword.match(/([a-z])/g).join("").length >= 2 &&
                        newPassword.match(/([A-Z])/g).join("").length >= 2 &&
                        newPassword.match(/([0-9])/g).join("").length >= 2 &&
                        newPassword
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !newPassword.match(/([\s\b\n\t])/g) &&
                        newPassword.length >= 8 &&
                        newPassword.length <= 60
                    )
                ) {
                    newPasswordResponse.push("format-password-two");
                }
            } catch {
                newPasswordResponse.push("format-password-two");
            }

            if (newPassword !== newPasswordConfirmation) {
                newPasswordResponse.push("match-password");
            }
        };

        regexTest();

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
        const newPasswordResponse: string[] = [];
        const {mail, deleteAccountPassword} = _req.body;

        const regexTest = () => {
            try {
                if (
                    !(
                        deleteAccountPassword.match(/([a-z])/g).join("")
                            .length >= 2 &&
                        deleteAccountPassword.match(/([A-Z])/g).join("")
                            .length >= 2 &&
                        deleteAccountPassword.match(/([0-9])/g).join("")
                            .length >= 2 &&
                        deleteAccountPassword
                            .match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g)
                            .join("").length >= 1 &&
                        !deleteAccountPassword.match(/([\s\b\n\t])/g) &&
                        deleteAccountPassword.length >= 8 &&
                        deleteAccountPassword.length <= 60
                    )
                ) {
                    newPasswordResponse.push("format-password");
                }
            } catch {
                newPasswordResponse.push("format-password");
            }
        };

        regexTest();

        if (newPasswordResponse.length === 0) {
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
        } else {
            res.status(200).json(newPasswordResponse);
        }
    },
};
