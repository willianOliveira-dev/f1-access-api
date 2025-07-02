import express, { Express } from "express";
import driverRouter from "./routes/driver.js";
import teamRouter from "./routes/team.js";

const baseAPIRoute: string = "/api/v1";
const app: Express = express();

// Middleware
app.use(express.json());
app.use(baseAPIRoute + "/drivers", driverRouter);
app.use(baseAPIRoute + "/teams", teamRouter);

const PORT: number = 8000;
app.listen(PORT, (): void => {
    console.info(`Servidor rodando em http://localhost:${PORT}`);
});
