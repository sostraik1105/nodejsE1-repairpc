const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/users');
const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');
dotenv.config({ path: './config.env' });

const getAllUsers = errorHandler(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });

    res.status(200).json({ users });
});

const createUser = errorHandler(async (req, res, next) => {
    const { name, email, password, role, status } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
        status,
    });

    newUser.password = undefined;

    res.status(201).json({ newUser });
});

const findById = errorHandler(async (req, res, next) => {
    const { user } = req;
    res.status(201).json({ user });
});

const updateUser = errorHandler(async (req, res, next) => {
    const { user } = req;
    const { name, email, password, role, status } = req.body;
    await user.update({ name, email, password, role, status });
    res.status(200).json({ status: 'success' });
});

const deleteUser = errorHandler(async (req, res, next) => {
    const { user } = req;
    await user.update({ status: 'disabled' });
    res.status(200).json({ status: 'success' });
});

const login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, status: 'enabled' } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(200).json({ token, user });
});

module.exports = {
    getAllUsers,
    createUser,
    findById,
    updateUser,
    deleteUser,
    login,
};
