const {PG} = require("../services/database");


const pg = new PG();
async function apiAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    try {
        const client = await pg.getClient();

        // Query the 'api_keys' table to check if the API key exists
        const result = await client.query('SELECT * FROM api_keys WHERE key = $1', [apiKey]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid API key' });
        }

        // Store the user or key information in the request object for later use
        req.user = result.rows[0];
        req.apiKey = apiKey;

        next();
    } catch (error) {
        console.error('Error during API key authentication:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = apiAuth;
