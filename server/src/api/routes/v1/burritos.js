const express = require('express');
const router = express.Router();
const {PG} = require("../../services/database")
const {Burrito} = require("../../models/burrito");

const pg = new PG();
const burrito = new Burrito();
router.get('/api/burritos', async (req, res) => {
    try {
        const result = await burrito.listBurritos();
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        throw error;
    }
});

module.exports = router;
