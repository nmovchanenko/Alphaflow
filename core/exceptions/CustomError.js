/**
 * Created by mikalai.mauchanenka on 06.11.2015.
 */
function CustomError(message) {
    this.name = "CustomError";
    this.message = message;

    logger.error(this.message);

    //if (Error.captureStackTrace) {
    //    Error.captureStackTrace(this, this.constructor);
    //}
    //else {
    //    this.stack = (new Error()).stack;
    //}

}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;