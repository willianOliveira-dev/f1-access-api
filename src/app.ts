import express from "express";
import { Request, Response } from "express";
import driversInRandomOrder from "../dist/data.js";
import insertionSortLike from "../dist/InsertionSortLike.js";
import { randomUUID } from "node:crypto";
import { error } from "node:console";

interface Driver {
    name: string;
    team: string;
    points: number;
    id: string;
}

interface ErrorResponse {
    error: string;
}

const app = express();
const baseAPIRoute: string = "/api/v1";
let drivers: Driver[] = driversInRandomOrder;

// Middleware
app.use(express.json());

// TODO:  GET
app.get(
    baseAPIRoute + "/drivers",
    (req: Request, res: Response<Driver[]>): void => {
        res.status(200).send(drivers);
    }
);

app.get(
    baseAPIRoute + "/drivers/standings/:position",
    (
        req: Request<{ position: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        const position = Number(req.params.position);

        if (isNaN(position)) {
            res.status(400).send({ error: "Position must be a number." });
            return;
        }
        if (position > drivers.length || position <= 0) {
            res.status(400).send({ error: "Position out of range." });
            return;
        }

        const selectDriver: Driver = drivers[position - 1];

        res.status(200).send(selectDriver);
    }
);

app.get(
    baseAPIRoute + "/drivers/:id",
    (
        req: Request<{ id: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        const { id } = req.params;
        const selectDriver: Driver = drivers.find(
            (driver: Driver): boolean => driver.id === id
        );

        if (selectDriver === undefined) {
            res.status(400).send({ error: "Driver not found!" });
            return;
        }

        res.status(200).send(selectDriver);
    }
);

// TODO:  POST
app.post(baseAPIRoute + "/drivers", (req, res) => {
    const reqBody: any = req.body;
    if (!reqBody.name || !reqBody.team || !reqBody.points)
        res.status(400).send("Dr");
    const newDriver: Driver = { ...req.body, id: randomUUID() };

    drivers.push(newDriver);

    drivers = insertionSortLike(drivers, "desc", "points");

    res.status(200).send(newDriver);
});

// TODO: PUT
app.put(
    baseAPIRoute + "/drivers/:id",
    (
        req: Request<{ id: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        const { id } = req.params;
        const selectDriver: Driver = drivers.find(
            (driver: Driver) => driver.id === id
        );

        if (selectDriver === undefined) {
            res.status(400).send({ error: "Driver not found!" });
            return;
        }

        for (const key in selectDriver) {
            if (req.body[key] !== undefined) {
                selectDriver[key] = req.body[key];
            }
        }

        drivers = insertionSortLike(drivers, "desc", "points");

        res.status(200).send(selectDriver);
    }
);

// TODO : DELETE
app.delete(
    baseAPIRoute + "/drivers/:id",
    (
        req: Request<{ id: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        const { id } = req.params;
        const selectDriver: Driver = drivers.find(
            (driver: Driver) => driver.id === id
        );

        if (selectDriver === undefined) {
            res.status(400).send({ error: "Driver not found!" });
            return;
        }

        const index = drivers.indexOf(selectDriver);

        drivers.splice(index, 1);

        drivers = insertionSortLike(drivers, "desc", "points");
        res.status(200).send(selectDriver);
    }
);

const PORT: number = 8000;
app.listen(PORT, (): void => {
    console.info(`Servidor rodando em http://localhost:${PORT}`);
});
