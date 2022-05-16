const { body, validationResult } = require('express-validator');

const createRequireValidations = [
    body('date').notEmpty().withMessage('Date cannot be empty'),
    body('computerNumber')
        .notEmpty()
        .withMessage('Date cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Computer number must be at least 6 characters long'),
    body('comments')
        .isLength({ max: 150 })
        .withMessage('The comments must be less 150 characters'),
];

const createUsersValidations = [
    body('name').notEmpty().withMessage('Date cannot be empty'),
    body('email').notEmpty().withMessage('Date cannot be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Computer number must be at least 8 characters long'),
];

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);

        const errorMsg = messages.join('. ');

        return res.status(400).json({
            status: 'error',
            message: errorMsg,
        });
    }

    next();
};

module.exports = {
    createRequireValidations,
    createUsersValidations,
    checkValidations,
};
