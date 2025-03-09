const errorMiddleware = (err, req, res, next) => {
    // checks the logic and then when all the middlewares pass the next function can the login proceed
    try{
        let error = {...err}
        error.message = err.message
        console.error(err)
        // Mongoose bad objecid
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new Error(message)
            error.status = 404
        }

        // Mongoose duplicate key
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new Error(message)
            error.status = 400
        }

        // Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message)
            error.status = 400
        }

        res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Server Error'
        })
    }catch(e){
        next(e);
    }
}

export default errorMiddleware;