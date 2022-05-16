const { User } = require('../models/users');
const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');

const getAllUsers = errorHandler(async (req, res, next) => {
    const users = await User.findAll();

    res.status(200).json({ users });
});

const createUser = errorHandler(async (req, res, next) => {
    const { name, email, password, role, status } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        role,
        status,
    });

    res.status(201).json({ newUser });
});

const findById = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const selectedUser = await User.findOne({ where: { id } });

    if (!selectedUser) {
        return res.status(404).json({
            status: 'Error',
            message: 'User not found given that id',
        });
    }

    res.status(201).json({ selectedUser });
});

const updateUser = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;
    const user = await User.findOne({ where: { id } });

    if (!user) {
        return next(new AppError('User not found given that id', 404));
    }

    await user.update({ name, email, password, role, status });

    res.status(200).json({ status: 'success' });
});

const deleteUser = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
        return res.status(404).json({
            status: 'Error',
            message: 'User not found given that id',
        });
    }

    await user.update({ status: 'disabled' });
    res.status(200).json({ status: 'success' });
});

module.exports = {
    getAllUsers,
    createUser,
    findById,
    updateUser,
    deleteUser,
};
