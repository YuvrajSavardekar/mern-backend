class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);     // override "message" property of "Error" object that we extend
    this.code = errorCode;     // adds a "code" property
  }
}

module.exports = HttpError;