const { Pool } = require('pg');
const { Client } = require('pg');

export class PG {
    constructor() {
        if (PG.instance) {
            return PG.instance;
        }
        this.client = new Client({
            user: 'postgres',
            password: 'password',
            host: 'postgres',
            port: 5432,
            database: 'mydatabase',
        });
        PG.instance = this;
        PG.isConnected = false;
    }

    async getClient() {
        if (!PG.isConnected) {
            await this.client.connect();
            PG.isConnected = true;
        }
        return this.client;
    }
}