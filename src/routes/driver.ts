import express, { Request, Response, Router } from "express";
import insertionSortLike from "../InsertionSortLike.js";
import {
    driversInOrder,
    Driver,
    ErrorResponse,
    generateTeamsArray,
} from "../data.js";
import { randomUUID } from "node:crypto";
import {
    validateDriverInfo,
    validateUpdateDriverInfo,
    validatePosition,
} from "../inputValidation.js";
import { teams } from "./team.js";

const router: Router = express.Router();
let drivers: Driver[] = driversInOrder;

router.get("/", (_, res: Response<Driver[]>): void => {
    res.status(200).send(drivers);
});

router.get(
    "/standings/:position",
    (
        req: Request<{ position: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        let { position } = req.params;

        const { error, value } = validatePosition(position, drivers.length);
        if (error) {
            res.status(400).send({ error: error.details[0].message });
            return;
        }

        const selectDriver: Driver = drivers[value - 1];

        res.status(200).send(selectDriver);
    }
);

router.get(
    "/:id",
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

router.post(
    "/",
    (req: Request, res: Response<Driver | ErrorResponse>): void => {
        const driverSchemaValidate = validateDriverInfo(req.body);

        const { error, value } = driverSchemaValidate;

        if (error) {
            res.status(400).send({
                error: error.details.map((error) => error.message).join(" - "),
            });
            return;
        }

        const newDriver: Driver = { ...value, id: randomUUID() };

        drivers.push(newDriver);

        drivers = insertionSortLike(drivers, "desc", "points");
        teams.length = 0; // Limpar o array
        teams.push(...generateTeamsArray(drivers));
        res.status(200).send(newDriver);
    }
);

router.put(
    "/:id",
    (
        req: Request<{ id: string }>,
        res: Response<Driver | ErrorResponse>
    ): void => {
        const updateDriverSchemaValidate = validateUpdateDriverInfo(req.body);

        const { error } = updateDriverSchemaValidate;

        const { id } = req.params;

        if (error) {
            res.status(400).send({
                error: error.details.map((error) => error.message).join(" - "),
            });
            return;
        }

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

        teams.length = 0; // Limpar o array
        teams.push(...generateTeamsArray(drivers));
        res.status(200).send(selectDriver);
    }
);

router.delete(
    "/:id",
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

export default router;
