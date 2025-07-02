import express, { Request, Response, Router } from "express";
import { driversInOrder, Team, generateTeamsArray, ErrorResponse } from "../data.js";
import { validatePosition } from "../inputValidation.js";

export let teams: Team[] = generateTeamsArray(driversInOrder);
const router: Router = express.Router();

router.get("/", (_, res: Response<Team[]>): void => {
    res.status(200).send(teams);
});

router.get(
    "/standings/:position",
    (
        req: Request<{ position: string }>,
        res: Response<Team | ErrorResponse>
    ): void => {
        let { position } = req.params;

        const { error, value } = validatePosition(position, teams.length);

        if (error) {
            res.status(400).send({ error: error.details[0].message });
            return;
        }

        const selectTeam: Team = teams[value - 1];

        res.status(200).send(selectTeam);
    }
);

export default router;
