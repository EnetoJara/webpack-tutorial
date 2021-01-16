import { Router, Request, Response } from "express";

export default function routes () {
    const api = Router();

    api.get("/api/hola-mundo", (req: Request, res: Response) => {
        return res.status(200).json({ success: "Hola Mundo" });
    });

    return api;
}
