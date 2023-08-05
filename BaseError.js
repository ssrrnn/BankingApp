class BaseError extends Error{
    constructor(message, statusCode, specMessage){
        super()
        this.message = message
        this.statusCode = statusCode
        this.specMessage = specMessage

    }
}
module.exports = BaseError