const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const isDev = process.env.NODE_ENV === "development";
    const isOperational = err.isOperational || false;

    let message = err.message;

    if(!isDev && !isOperational){
        message = "Something went wrong"
    }

    const response = {
        success: false,
        message: err.message || "Internal Server Error",
    };

    if (isDev) {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
