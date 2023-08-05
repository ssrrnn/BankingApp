const BaseError = require("./BaseError");

class NotFound extends BaseError{
    constructor(specMessage){
        super("Not Found", 404, specMessage)
    }
}

module.exports = NotFound