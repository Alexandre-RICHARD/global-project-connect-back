import {Request, Response} from "express";
import {getAllUsers} from "../models/accountHandlers";

const mainController = {
    "getUsers": async (_req: Request, res: Response) => {
        try {
            const response = await getAllUsers();
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            res.status(200).json(error);
        }
    },
};

export default mainController;
