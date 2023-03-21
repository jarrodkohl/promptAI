import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import openAiRouter from "./api/v1/openAiRouter.js";
import promptRouter from "./api/v1/promptRouter.js";
import authGoogleRouter from "./api/v1/authGoogleRouter.js";


const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/auth/google", authGoogleRouter);

// rootRouter.use("/api/v1/generate-prompt", (req, res, next) => {
//     req.url = "/api/v1/openai/generate-prompt";
//     next();
//   });
  
rootRouter.use("/api/v1/openai", openAiRouter);
rootRouter.use("/api/v1/prompts", promptRouter)

export default rootRouter;
