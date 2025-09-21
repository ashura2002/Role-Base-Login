import ApiError from "../lib/ApiError.js";

export const errHandling = (err, req, res, next) =>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errorMessage: err.errors
        })
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    })
}