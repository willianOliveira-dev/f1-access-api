import express from "express";
import driversInRandomOrder from "../dist/data.js";
import insertionSortLike from "../dist/InsertionSortLike.js";
import { randomUUID } from "node:crypto";

interface Driver {
    name: string;
    team: string;
    points: number;
    id: string;
}

const app = express();
const baseAPIRoute: string = "/api/v1";
let drivers: Driver[] = driversInRandomOrder;

// Middleware
app.use(express.json());

// TODO:  GET

app.get(baseAPIRoute + "/drivers", (req, res) => {
    res.status(200).send(drivers);
});

app.get(baseAPIRoute + "/drivers/standings/:position", (req, res) => {
    const { position }: any = req.params;
    const selectDriver: Driver = drivers[position - 1];
    res.status(200).send(selectDriver);
});

app.get(baseAPIRoute + "/drivers/:id", (req, res) => {
    const { id }: any = req.params;
    const selectDriver: Driver = drivers.find(
        (driver: Driver): boolean => driver.id === id
    );
    res.status(200).send(selectDriver);
});

// TODO:  POST

app.post(baseAPIRoute + "/drivers", (req, res) => {
    const newDriver: Driver = { ...req.body, id: randomUUID() };
    drivers.push(newDriver);
    drivers = insertionSortLike(drivers, "desc", "points");
    res.status(200).send(newDriver);
});

// TODO: PUT

// TODO : DELETE

const PORT: number = 8000;
app.listen(PORT, (): void => {
    console.info(`Servidor rodando em http://localhost:${PORT}`);
});
