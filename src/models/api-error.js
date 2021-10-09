
class ErrorModel {

    constructor(status, cause, message) {
        this.status = status || 0;
        this.cause = cause || "";
        this.message = message || [];
    }

    newInternalServerError(message) {
        this.cause = "Internal server error";
        this.status = 500;
        this.message = message;
        return this
    }

    newBadRequest(message) {
        this.cause = "Bad Request";
        this.status = 400;
        this.message = message;
        return this;
    }

    newNotFound(message) {
        this.cause = "Not Found";
        this.status = 404;
        this.message = message;
        return this;
    }

    newUnauthorized(message) {
        this.cause = "Unauthorized";
        this.status = 401;
        this.message = message;
        return this;
    }

    print() {
        console.log(`
                👹 Error: ${this.status}
                👹 Cause: ${this.cause}
                👹 Message: ${this.message}`);
        return this
    }

    send(res) {
        this.print()
        return res.status(this.status).json({ message: this.message, cause: this.cause })
    }
};

module.exports = ErrorModel;