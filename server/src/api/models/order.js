import {PG} from "../services/database";
import {APIError} from "./error";

export class Order {
    async getOrders(){
        try {
            const pg = new PG();
            const client = await pg.getClient();
            return await client.query('SELECT * FROM "order"');
        } catch (error) {
            console.log(error)
            throw new APIError('error processing getOrders', 500);
        }
    }

    async getOrderDetail(orderId) {
        const pg = new PG();
        const orderInformationQuery = `
            SELECT
              o.id AS order_id,
              o.total_cost,
              o.date_created, 
              oi.quantity,
              bo.price AS option_price,
              b.name AS burrito_name,
              b.size AS burrito_size,
              b.price AS burrito_price,
              op.name AS option_name,
              op.quantity AS option_quantity
            FROM
              "order" o
            JOIN
              order_item oi ON o.id = oi.order_id
            JOIN
              burrito_option bo ON oi.burrito_option_id = bo.id
            JOIN
              burrito b ON bo.burrito_id = b.id
            LEFT JOIN
              "option" op ON bo.option_id = op.id
            WHERE
              o.id = ${orderId};
    `
        const client = await pg.getClient();
        const result = await client.query(orderInformationQuery);

        const orderDetails = result.rows;

        if (orderDetails.length < 1)
            throw new APIError('given order id not found', 404);

        const response = {
            total_cost: orderDetails[0].total_cost,
            date_created: orderDetails[0].date_created,
            items: orderDetails.map((item) => ({
                burrito: {
                    name: item.burrito_name,
                    size: item.burrito_size,
                    price: item.burrito_price,
                    quantity: item.quantity,
                },
                option: {
                    name: item.option_name,
                    price: item.option_price,
                    quantity: item.option_quantity,
                },
            })),
        };

        console.log("the response is ", orderDetails)
        return response
    }
}