import { json, urlencoded, Request, Response, Express, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileExpress from "express-fileupload";
import routes from "./routes";

import express from "express";

export default function expressApp (): Express {
    const app = express();

    app.use(fileExpress());
    app.use(function (req: Request, res: Response, next: NextFunction): void {
        const aux = req.headers[ "x-forwarded-for" ] as string;

        const xForwardedFor = (aux || "").replace(/:\d+$/, "");
        const ip = xForwardedFor || req.socket.remoteAddress;

        req.userIp = ip;

        next();
    });

    app.use(cookieParser(process.env.ENETO_PRIVATE));
    app.use(cors());
    app.use(json());
    app.use(routes());
    app.use(urlencoded({ extended: true, limit: "5m" }));
    app.disable("x-powered-by");

    return app;
}
