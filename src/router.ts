import {Request, Response} from "express";
import {Router as createRouter} from "express";

import accountController from "./controllers/accountController";

const router = createRouter();

// Here will be all our routes
router.get("/users/all", accountController.getUsers);

// Handling all other route unassigned to a controller method
router.use((_req: Request, res: Response): void => {
    res.status(404).json(
        "404 - Pas de route gérée par le serveur sur cette adresse"
    );
});

export default router;
