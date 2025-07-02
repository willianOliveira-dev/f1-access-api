import insertionSortLike from "./InsertionSortLike.js";

export interface Driver {
    name: string;
    team: string;
    points: number;
    id: string;
}

export interface Team {
    team: string;
    points: number;
}

export interface ErrorResponse {
    error: string;
}

const driversInRandomOrder: Driver[] = [
    {
        name: "Max Verstappen",
        team: "Red Bull Racing",
        points: 575,
        id: "8e20e33f-b840-453b-b841-d49ae331d2f7",
    },
    {
        name: "Sergio Perez",
        team: "Red Bull Racing",
        points: 285,
        id: "cb1965ce-9c8b-4b77-b9fe-339bbb631517",
    },
    {
        name: "Fernando Alonso",
        team: "Aston Martin",
        points: 206,
        id: "432f2035-5d04-441c-b6a8-bcf850052886",
    },
    {
        name: "Lewis Hamilton",
        team: "Mercedes",
        points: 234,
        id: "6c46cf5a-e430-413c-8527-9aaea51dd4d7",
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        points: 206,
        id: "ac2e4ffe-1778-4049-b9b9-411ef458ca4d",
    },
    {
        name: "Lando Norris",
        team: "Mclaren",
        points: 205,
        id: "aaac0991-4ee9-474c-83fa-e7116fd739ee",
    },
    {
        name: "Carlos Sainz Jr",
        team: "Ferrari",
        points: 200,
        id: "143727a6-65b8-4bd9-b539-74b7265f7052",
    },
    {
        name: "George Russel",
        team: "Mercedes",
        points: 175,
        id: "38212c1b-0f75-4a4f-bb7a-fc1e4c4caaf7",
    },
    {
        name: "Oscar Piastri",
        team: "Mclaren",
        points: 97,
        id: "29d29ec4-0c42-484d-88ec-be1a2ee3690e",
    },
    {
        name: "Lance Stroll",
        team: "Aston Martin",
        points: 74,
        id: "28606b50-8054-49af-ac35-fdf4a2dbe25f",
    },
    {
        name: "Pierre Gasly",
        team: "Alpine",
        points: 62,
        id: "fb3de041-1c7c-4516-8245-694d9b2697f5",
    },
    {
        name: "Esteban Ocon",
        team: "Alpine",
        points: 58,
        id: "cee66a78-f918-44ab-9b90-3117515344e7",
    },
    {
        name: "Alexander Albon",
        team: "Mclaren",
        points: 27,
        id: "6ba3a591-05f3-4182-976a-232659ebcb54",
    },
    {
        name: "Yuki Tsunoda",
        team: "AlphaTauri",
        points: 17,
        id: "9ec99d29-950c-4851-a9e6-5eb74ed43d60",
    },
    {
        name: "Valteri Bottas",
        team: "Alfa Romeo",
        points: 10,
        id: "853c8634-c2d2-460a-8f67-a3dca38a0b6a",
    },
    {
        name: "Nico Hulkenberg",
        team: "Haas",
        points: 9,
        id: "4166ca7b-6941-4f5a-a81e-891fb80a04a6",
    },
    {
        name: "Guanyu Zhou",
        team: "Alfa Romeo",
        points: 6,
        id: "1ffebd8f-572e-43b1-862e-cfec0cf889a7",
    },
    {
        name: "Kevin Magnussen",
        team: "Haas",
        points: 3,
        id: "7a355ae2-13dc-49ca-900a-8cc52a813888",
    },
    {
        name: "Liam Lawson",
        team: "AlphaTauri",
        points: 2,
        id: "dc51e4b2-9b04-4fb8-b780-650a755f3bb6",
    },
    {
        name: "Logan Sargeant",
        team: "Williams",
        points: 1,
        id: "54e3d25b-e421-4d29-a96d-22effbed9f8e",
    },
    {
        name: "Nick de Vries",
        team: "AlphaTauri",
        points: 0,
        id: "d15a9c50-5943-4be6-872f-b850914c9a80",
    },
];

export const driversInOrder = insertionSortLike(
    driversInRandomOrder,
    "desc",
    "points"
);

export const generateTeamsArray = (drivers: Driver[]): Team[] => {
    return insertionSortLike(
        drivers.reduce((acc: Team[], currentValue: Driver): Team[] => {
            const { team, points } = currentValue;
            const teamObject = acc.find((t) => t.team == team);
            teamObject !== undefined
                ? (teamObject.points += points)
                : acc.push({ team, points });
            return acc;
        }, []),
        "desc",
        "points"
    );
};
