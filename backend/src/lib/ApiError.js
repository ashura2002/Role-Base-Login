export default class ApiError extends Error{
    constructor(message, statusCode, errors =[]){
        super(message)
        this.statusCode = statusCode
        this.errors = errors
    }
}

// for not found
export class NotFound extends ApiError{
    constructor(message,statusCode){
        super(message, 404)
    }
}

// for jwt error
export class NotAuthorized extends ApiError{
    constructor(message, statusCode){
        super(message, 401)
    }
}

// for bad request
export class BadRequest extends ApiError{
    constructor(message,statusCode){
        super(message, 400)
    }
}