const BaseError = require("./BaseError");

class Unauthorized extends BaseError
{
    constructor(specMessage)
    {
        super("Unauthorized access", 403, specMessage)
    }
}
module.exports = Unauthorized