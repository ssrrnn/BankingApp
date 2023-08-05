const BaseError = require("./BaseError");

class Invalid extends BaseError
{
    constructor(specMessage)
    {
        super("Invalid type", 403, specMessage)
    }
}
module.exports = Invalid