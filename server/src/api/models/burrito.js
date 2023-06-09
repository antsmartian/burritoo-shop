import {PG} from "../services/database";
import e from "express";
import {APIError} from "./error";

export class Burrito {
    async listBurritos() {
        const pg = new PG();
        try {
            const client = await pg.getClient();
            return  await client.query('SELECT * FROM "burrito"');
        } catch (error) {
            // in prod log it
            throw new APIError('error processing listBurritos', 500);
        }
    }
}