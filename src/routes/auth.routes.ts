import { Router } from "express";
import { auth } from "../config/better-auth";
import { toNodeHandler } from "better-auth/node";

const authRouter = Router();

authRouter.use("/auth", toNodeHandler(auth));

export default authRouter;
