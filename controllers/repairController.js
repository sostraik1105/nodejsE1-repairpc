const { Repair } = require('../models/repairs');

const getPendingRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll({ where: { status: 'pending' } });

        res.status(200).json(repairs);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getAllRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll();

        res.status(200).json(repairs);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getPendingById = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({
            where: { id, status: 'pending' },
        });

        if (!repair) {
            return res.status(404).json({
                status: 'Error',
                message: 'Repair not found',
            });
        }

        res.status(201).json({ repair });
    } catch (error) {
        res.status(400).json(error);
    }
};

const getRepairById = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({
            where: { id },
        });

        if (!repair) {
            return res.status(404).json({
                status: 'Error',
                message: 'Repair not found',
            });
        }

        res.status(201).json({ repair });
    } catch (error) {
        res.status(400).json(error);
    }
};

const createNewRepair = async (req, res) => {
    try {
        const { date, status, userId } = req.body;
        const newRepair = await Repair.create({ date, status, userId });
        res.status(201).json({ newRepair });
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, status, userId } = req.body;
        const repair = await Repair.findOne({
            where: { id, status: 'pending' },
        });

        if (!repair) {
            return res.status(404).json({
                status: 'Error',
                message: 'Repair not found',
            });
        }

        await repair.update({ date, status, userId });

        res.status(201).json({ repair });
    } catch (error) {}
};

const cancelRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } });

        if (!repair) {
            return res.status(404).json({
                status: 'Error',
                message: 'Repair not found',
            });
        }

        await repair.update({ status: 'cancelled' });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getPendingRepairs,
    getAllRepairs,
    createNewRepair,
    getPendingById,
    updateRepair,
    cancelRepair,
    getRepairById,
};
