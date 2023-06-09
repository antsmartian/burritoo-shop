export class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.name = 'APIError';
    }
}

module.exports = APIError;