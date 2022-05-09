const { Repair } = require('../models/repairs');
const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');

const getPendingRepairs = errorHandler(async (req, res) => {
    const repairs = await Repair.findAll({
        where: { status: 'pending' },
    });

    res.status(200).json(repairs);
});

const getAllRepairs = errorHandler(async (req, res) => {
    const repairs = await Repair.findAll();

    res.status(200).json(repairs);
});

const getPendingById = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
        where: { id, status: 'pending' },
    });

    if (!repair) {
        return next(new AppError('Repair not found', 404));
    }

    res.status(201).json({ repair });
});

const getRepairById = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
        where: { id },
    });

    if (!repair) {
        return next(new AppError('Repair not found', 404));
    }

    res.status(201).json({ repair });
});

const createNewRepair = errorHandler(async (req, res, next) => {
    const { date, computerNumber, comments, status, userId } = req.body;
    const newRepair = await Repair.create({
        date,
        computerNumber,
        comments,
        status,
        userId,
    });
    res.status(201).json({ newRepair });
});

const updateRepair = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const repair = await Repair.findOne({
        where: { id, status: 'pending' },
    });

    if (!repair) {
        return next(new AppError('Repair not found', 404));
    }

    await repair.update({ status });

    res.status(201).json({ repair });
});

const cancelRepair = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
        return next(new AppError('Repair not found', 404));
    }

    await repair.update({ status: 'cancelled' });
    res.status(200).json({ status: 'success' });
});

module.exports = {
    getPendingRepairs,
    getAllRepairs,
    createNewRepair,
    getPendingById,
    updateRepair,
    cancelRepair,
    getRepairById,
};
