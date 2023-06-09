const request = require('supertest');
const {app, server} = require('../app');

describe('GET /v1/api/burritos', () => {

    beforeAll(() => {
        server.close()
        server.listen(3001); // Change the port here
    });

    // After all tests, close the server
    afterAll((done) => {
        server.close(done);
    });

    it('should return an array of burritos', async () => {
        const response = await request(app).get('/v1/api/burritos')
            .set('x-api-key', 'kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ');


        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        // You can add additional assertions to verify the response data
        // For example:
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('size');
        expect(response.body[0]).toHaveProperty('price');
    });
});
