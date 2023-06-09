const express = require('express');
const router = express.Router();
const {PG} = require("../../services/database")
const {Order} = require("../../models/order");

const pg = new PG();
const order = new Order();
router.get('/api/orders', async (req, res) => {
    try {
        const result = await order.getOrders();
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        throw error;
    }
});

router.get('/api/order/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const response  = await order.getOrderDetail(orderId);
        res.json(response);
    } catch (error) {
        console.log(error)
        throw error;
    }
});

module.exports = router;
