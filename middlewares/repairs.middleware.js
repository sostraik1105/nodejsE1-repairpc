const { Repair } = require('../models/repairs');

const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');

const repairPending = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
        where: { id },
    });

    if (!repair) {
        return next(new AppError('Repair not found', 404));
    }

    req.repair = repair;

    next();
});

module.exports = { repairPending };
