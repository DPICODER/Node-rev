/**
 * Generic validation middleware
 *
 * Usage:
 * validate(schema)
 */

const validate = (schema) => {
    return (req, res, next) => {
        const { error,value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {

            const formattedErrors = {};

            error.details.forEach((err) => {
                const key = err.path[0];
                formattedErrors[key] = err.message.replace(/"/g, "");
            });

            return res.status(400).json({
                message: "Validation Error",
                errors: formattedErrors
            });
        }
        req.body = value;// sanitized data
        next();

    };
}

module.exports = validate;