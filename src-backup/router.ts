import { Router } from "express";
import authRouter from "./routers/auth.router";

const router = Router();

router.use(authRouter);

export default router;
