function handleError(error, req, res, next) {
    let msg = "Internal Server Error";
    let status = 500;

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            msg = error.errors[0].message;
            break;
        case "EmailOrPasswordRequired":
            status = 400;
            msg = "Email or password required";
            break;
        case "InvalidCredentials":
            status = 401;
            msg = "Invalid username, email or password";
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401;
            msg = "Must login first";
            break;
        case "Forbidden":
            status = 403;
            msg = `you don't have access`;
            break;
        case "errorNotFound":
            status = 404;
            msg = "error not found";
            break;
    }

    res.status(status).json({
        message: msg,
    });
}

module.exports = handleError;
