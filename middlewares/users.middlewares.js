const { User } = require('../models/users');

const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');

const userExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { id },
    });

    if (!user) {
        return next(new AppError('User not found given that id', 404));
    }

    req.user = user;

    next();
});

module.exports = { userExists };
