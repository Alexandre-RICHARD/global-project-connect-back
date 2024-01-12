/* eslint-disable max-lines */
/* eslint-disable @stylistic/max-len */

import {Request, Response} from "express";
import {worktimeModel} from "../models/accountHandlers";

export const accountController = {
    "getUsers": async (_req: Request, res: Response) => {
        try {
            const response = await worktimeModel.getAllUsersData();
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            res.status(200).json(error);
        }
    },
    "registration": (_req: Request, res: Response) => {
        res.status(200).json("TEMPORARY");
    },
    "connection": (_req: Request, res: Response) => {
        res.status(200).json("TEMPORARY");
    },
    "changeMail": (_req: Request, res: Response) => {
        res.status(200).json("TEMPORARY");
    },
    "changePassword": (_req: Request, res: Response) => {
        res.status(200).json("TEMPORARY");
    },
    "deleteAccount": (_req: Request, res: Response) => {
        res.status(200).json("TEMPORARY");
    },
};

// const accountHandler = require("../models/accountHandler");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);

// // Les données venant du front vont venir subir les mêmes tests regex qu'en front. Ceci afin d'être sûr que l'utilisateur n'a pas modifié le code front. Et si on vérifie en front d'abord, c'est pour limiter les requêtes inutiles et donc de saturer le serveur
// // Le fonctionnement est similaire pour les deux fonctions. On créer une variable inputError pour chaque valeur. On le test exactement comme en front. Si l'input passe le test, il est ok, sinon on inscrit une erreur commune.
// // A la fin, on vérifie si tous les résultats de tests sont ok, si oui, on envoi les données dans les models pour utilisation en BDD
// const accountController = {
//     registration: async (req, res) => {
//         const registerResponse = [];
//         const { mail, nickname, password, passwordConfirmation } = req.body;

//         const regexTest = () => {
//             if (
//                 !mail.match(/.+@.+\..+/gm)
//             ) {
//                 registerResponse.push("format-mail");
//             }

//             if (
//                 !(!nickname.match(/[^0-9a-zA-Z-_]/gm) &&
//                 nickname.length >= 3 &&
//                 nickname.length <= 25)
//             ) {
//                 registerResponse.push("format-nickname");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     registerResponse.push("format-password");
//                 }
//             } catch {
//                 registerResponse.push("format-password");
//             }

//             if (password !== passwordConfirmation) {
//                 registerResponse.push("match-password");
//             }
//         };

//         regexTest();

//         if (registerResponse.length === 0) {
//             try {
//                 if (!(await accountHandler.getOneAccount(mail))[0]) {
//                     const hashedPassword = await bcrypt.hash(password, salt);
//                     try {
//                         const result = (await accountHandler.registerNewUser(nickname, mail, hashedPassword))[0];
//                         res.status(201).json(["register-success", result]);
//                     } catch (error) {
//                         res.status(500).json(["server-error"]);
//                     }
//                 } else {
//                     res.status(200).json(["account-already-exist"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(registerResponse);
//         }
//     },

//     connection: async (req, res) => {
//         const loginResponse = [];
//         const { mail, password } = req.body;

//         const regexTest = () => {
//             if (
//                 !mail.match(/.+@.+\..+/gm)
//             ) {
//                 loginResponse.push("format-mail");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     loginResponse.push("format-password");
//                 }
//             } catch {
//                 loginResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (loginResponse.length === 0) {
//             try {
//                 const tryFindAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (tryFindAccount && bcrypt.compareSync(password, tryFindAccount.password_hashed) === true) {
//                     const result = {
//                         nickname: tryFindAccount.nickname,
//                         mail: tryFindAccount.mail,
//                     };
//                     res.status(200).json(["login-success", result]);
//                 } else {
//                     res.status(200).json(["login-failed"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(loginResponse);
//         }
//     },

//     changeMail: async (req, res) => {
//         const newMailResponse = [];
//         const { currentMail, newMail, newMailConfirmation, password } = req.body;

//         const regexTest = () => {
//             if (
//                 !newMail.match(/.+@.+\..+/gm)
//             ) {
//                 newMailResponse.push("format-mail");
//             }

//             if (newMail !== newMailConfirmation) {
//                 newMailResponse.push("match-mail");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     newMailResponse.push("format-password");
//                 }
//             } catch {
//                 newMailResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (newMailResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(currentMail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(password, findGoodAccount.password_hashed)) {
//                         try {
//                             if (!(await accountHandler.getOneAccount(newMail))[0]) {
//                                 const result = (await accountHandler.changmail(findGoodAccount.id, newMail))[0];
//                                 res.status(200).json(["change-mail-success", result]);
//                             } else {
//                                 res.status(200).json(["account-already-exist"]);
//                             }
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newMailResponse);
//         }
//     },

//     changePassword: async (req, res) => {
//         const newPasswordResponse = [];
//         const { mail, oldPassword, newPassword, newPasswordConfirmation } = req.body;

//         const regexTest = () => {
//             try {
//                 if (
//                     !(oldPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     oldPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     oldPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     oldPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !oldPassword.match(/([\s\b\n\t])/g) &&
//                     oldPassword.length >= 8 &&
//                     oldPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password-one");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password-one");
//             }

//             try {
//                 if (
//                     !(newPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     newPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     newPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     newPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !newPassword.match(/([\s\b\n\t])/g) &&
//                     newPassword.length >= 8 &&
//                     newPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password-two");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password-two");
//             }

//             if (newPassword !== newPasswordConfirmation) {
//                 newPasswordResponse.push("match-password");
//             }
//         };

//         regexTest();

//         if (newPasswordResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(oldPassword, findGoodAccount.password_hashed)) {
//                         try {
//                             const result = (await accountHandler.changePassword(findGoodAccount.id, await bcrypt.hash(newPassword, salt)))[0];
//                             res.status(200).json(["change-password-success", result]);
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newPasswordResponse);
//         }
//     },

//     deleteAccount: async (req, res) => {
//         const newPasswordResponse = [];
//         const { mail, deleteAccountPassword } = req.body;

//         const regexTest = () => {
//             try {
//                 if (
//                     !(deleteAccountPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !deleteAccountPassword.match(/([\s\b\n\t])/g) &&
//                     deleteAccountPassword.length >= 8 &&
//                     deleteAccountPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (newPasswordResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(deleteAccountPassword, findGoodAccount.password_hashed)) {
//                         try {
//                             await accountHandler.deleteAccount(mail);
//                             res.status(200).json(["delete-account-success"]);
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newPasswordResponse);
//         }
//     },
// };

// module.exports = accountController;

/* eslint-disable max-lines */
/* eslint-disable @stylistic/max-len */
// const accountHandler = require("../models/accountHandler");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);

// import {worktimeModel} from "./../models/main";

// const mainController = {
//     "getData": async (_req: Request, res: Response) => {
//         try {
//             const response = await worktimeModel.getAllWorkTimeData();
//             res.json(response);
//         } catch (error) {
//             console.trace(error);
//             res.status(200).json(error);
//         }
//     },
// };

// export default mainController;

// // Les données venant du front vont venir subir les mêmes tests regex
// // qu'en front.
// // Ceci afin d'être sûr que l'utilisateur n'a pas modifié le code front.
// // Et si on vérifie en front d'abord, c'est pour limiter les requêtes
// // inutiles et donc de saturer le serveur
// //  Le fonctionnement est similaire pour les deux fonctions.
// // On créer une variable inputError pour chaque valeur. On le test
// // exactement comme en front. Si l'input passe le test, il est ok, sinon on
// // inscrit une erreur commune.
// // A la fin, on vérifie si tous les résultats de tests sont ok, si oui,
// // on envoi les données dans les models pour utilisation en BDD
// const accountController = {
//     "registration": async (req, res) => {
//         const registerResponse = [];
//         const {
//             mail, nickname, password, passwordConfirmation,
//         } = req.body;

//         const regexTest = () => {
//             if (
//                 !mail.match(/.+@.+\..+/gm)
//             ) {
//                 registerResponse.push("format-mail");
//             }

//             if (
//                 !(!nickname.match(/[^0-9a-zA-Z-_]/gm) &&
//                 nickname.length >= 3 &&
//                 nickname.length <= 25)
//             ) {
//                 registerResponse.push("format-nickname");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     registerResponse.push("format-password");
//                 }
//             } catch {
//                 registerResponse.push("format-password");
//             }

//             if (password !== passwordConfirmation) {
//                 registerResponse.push("match-password");
//             }
//         };

//         regexTest();

//         if (registerResponse.length === 0) {
//             try {
//                 if (!(await accountHandler.getOneAccount(mail))[0]) {
//                     const hashedPassword = await bcrypt.hash(password, salt);
//                     try {
//                         const result = (await accountHandler.registerNewUser(nickname, mail, hashedPassword))[0];
//                         res.status(201).json([
//                             "register-success",
//                             result
//                         ]);
//                     } catch (error) {
//                         res.status(500).json(["server-error"]);
//                     }
//                 } else {
//                     res.status(200).json(["account-already-exist"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(registerResponse);
//         }
//     },

//     "connection": async (req, res) => {
//         const loginResponse = [];
//         const {mail, password} = req.body;

//         const regexTest = () => {
//             if (
//                 !mail.match(/.+@.+\..+/gm)
//             ) {
//                 loginResponse.push("format-mail");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     loginResponse.push("format-password");
//                 }
//             } catch {
//                 loginResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (loginResponse.length === 0) {
//             try {
//                 const tryFindAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (tryFindAccount && bcrypt.compareSync(password, tryFindAccount.password_hashed) === true) {
//                     const result = {
//                         "nickname": tryFindAccount.nickname,
//                         "mail": tryFindAccount.mail,
//                     };
//                     res.status(200).json([
//                         "login-success",
//                         result
//                     ]);
//                 } else {
//                     res.status(200).json(["login-failed"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(loginResponse);
//         }
//     },

//     "changeMail": async (req, res) => {
//         const newMailResponse = [];
//         const {
//             currentMail, newMail, newMailConfirmation, password,
//         } = req.body;

//         const regexTest = () => {
//             if (
//                 !newMail.match(/.+@.+\..+/gm)
//             ) {
//                 newMailResponse.push("format-mail");
//             }

//             if (newMail !== newMailConfirmation) {
//                 newMailResponse.push("match-mail");
//             }

//             try {
//                 if (
//                     !(password.match(/([a-z])/g).join("").length >= 2 &&
//                     password.match(/([A-Z])/g).join("").length >= 2 &&
//                     password.match(/([0-9])/g).join("").length >= 2 &&
//                     password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !password.match(/([\s\b\n\t])/g) &&
//                     password.length >= 8 &&
//                     password.length <= 60)
//                 ) {
//                     newMailResponse.push("format-password");
//                 }
//             } catch {
//                 newMailResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (newMailResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(currentMail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(password, findGoodAccount.password_hashed)) {
//                         try {
//                             if (!(await accountHandler.getOneAccount(newMail))[0]) {
//                                 const result = (await accountHandler.changmail(findGoodAccount.id, newMail))[0];
//                                 res.status(200).json([
//                                     "change-mail-success",
//                                     result
//                                 ]);
//                             } else {
//                                 res.status(200).json(["account-already-exist"]);
//                             }
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newMailResponse);
//         }
//     },

//     "changePassword": async (req, res) => {
//         const newPasswordResponse = [];
//         const {
//             mail, oldPassword, newPassword, newPasswordConfirmation,
//         } = req.body;

//         const regexTest = () => {
//             try {
//                 if (
//                     !(oldPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     oldPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     oldPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     oldPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !oldPassword.match(/([\s\b\n\t])/g) &&
//                     oldPassword.length >= 8 &&
//                     oldPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password-one");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password-one");
//             }

//             try {
//                 if (
//                     !(newPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     newPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     newPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     newPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !newPassword.match(/([\s\b\n\t])/g) &&
//                     newPassword.length >= 8 &&
//                     newPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password-two");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password-two");
//             }

//             if (newPassword !== newPasswordConfirmation) {
//                 newPasswordResponse.push("match-password");
//             }
//         };

//         regexTest();

//         if (newPasswordResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(oldPassword, findGoodAccount.password_hashed)) {
//                         try {
//                             const result = (await accountHandler.changePassword(findGoodAccount.id, await bcrypt.hash(newPassword, salt)))[0];
//                             res.status(200).json([
//                                 "change-password-success",
//                                 result
//                             ]);
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newPasswordResponse);
//         }
//     },

//     "deleteAccount": async (req, res) => {
//         const newPasswordResponse = [];
//         const {mail, deleteAccountPassword} = req.body;

//         const regexTest = () => {
//             try {
//                 if (
//                     !(deleteAccountPassword.match(/([a-z])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([A-Z])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([0-9])/g).join("").length >= 2 &&
//                     deleteAccountPassword.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
//                         .length >= 1 &&
//                     !deleteAccountPassword.match(/([\s\b\n\t])/g) &&
//                     deleteAccountPassword.length >= 8 &&
//                     deleteAccountPassword.length <= 60)
//                 ) {
//                     newPasswordResponse.push("format-password");
//                 }
//             } catch {
//                 newPasswordResponse.push("format-password");
//             }
//         };

//         regexTest();

//         if (newPasswordResponse.length === 0) {
//             try {
//                 const findGoodAccount = (await accountHandler.getOneAccount(mail))[0];
//                 if (findGoodAccount) {
//                     if (bcrypt.compareSync(deleteAccountPassword, findGoodAccount.password_hashed)) {
//                         try {
//                             await accountHandler.deleteAccount(mail);
//                             res.status(200).json(["delete-account-success"]);
//                         } catch (error) {
//                             res.status(500).json(["server-error"]);
//                         }
//                     } else {
//                         res.status(200).json(["wrong-password"]);
//                     }
//                 } else {
//                     res.status(200).json(["mail-error"]);
//                 }
//             } catch (error) {
//                 res.status(500).json(["server-error"]);
//             }
//         } else {
//             res.status(200).json(newPasswordResponse);
//         }
//     },
// };

// module.exports = accountController;
